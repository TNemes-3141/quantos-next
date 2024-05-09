'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'

import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/database/db'
import { accessCodes, userData } from '@/lib/database/schema'
import { DbAccessCodeResponse } from '@/lib/types'

type SubmitAccessCodeResponse = {
  responseCode: DbAccessCodeResponse,
  errorMessage: string | undefined,
}

export async function submitAccessCode(code: string): Promise<SubmitAccessCodeResponse> {
  let accessCode;
  try {
    accessCode = await db.query.accessCodes.findFirst({
      where: eq(accessCodes.code, code),
    })
  } catch (error: any) {
    console.error(error.message);
    return {
      responseCode: DbAccessCodeResponse.UNKNOWN_ERROR,
      errorMessage: error.message,
    };
  }

  let response: DbAccessCodeResponse = DbAccessCodeResponse.OK;

  if (!accessCode) {
    response = DbAccessCodeResponse.CODE_NOT_FOUND;
    return { responseCode: response, errorMessage: undefined };
  }
  if (!accessCode.active) {
    response = DbAccessCodeResponse.CODE_NOT_ACTIVE;
    return { responseCode: response, errorMessage: undefined };
  }

  const now = new Date();
  const oldestAllowedCreationDate = new Date(now);
  oldestAllowedCreationDate.setDate(oldestAllowedCreationDate.getDate() - accessCode.expiresAfter);
  if (accessCode.createdAt < oldestAllowedCreationDate) {
    response = DbAccessCodeResponse.CODE_EXPIRED;
    return { responseCode: response, errorMessage: undefined };
  }

  if (!accessCode.firstAccessedAt) {
    await db.update(accessCodes)
      .set({ firstAccessedAt: new Date() })
      .where(eq(accessCodes.code, code));
    response = DbAccessCodeResponse.OK_NEW_USER;
  }

  await anonymousSignIn(response, code);
  return { responseCode: DbAccessCodeResponse.OK, errorMessage: undefined };
}

async function anonymousSignIn(dbResponse: DbAccessCodeResponse, code: string) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInAnonymously()

  if (error) {
    redirect('/error');
  }

  if (dbResponse == DbAccessCodeResponse.OK_NEW_USER) {
    try {
      await db.insert(userData).values({ userId: data.user!.id, registeredAccessCode: code});
    } catch (error) {
      redirect('/error');
    }

    revalidatePath('/welcome', 'layout');
    redirect('/welcome');
  }
  else {
    revalidatePath('/home', 'layout');
    redirect('/home');
  }
}