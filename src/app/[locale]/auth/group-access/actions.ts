'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'

import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/database/db'
import { accessCodes } from '@/lib/database/schema'
import { DbAccessCodeResponse } from '@/lib/types'

export async function submitAccessCode(code: string): Promise<DbAccessCodeResponse> {
  console.log("Querying database for code " + code);
  let accessCode;
  try {
    accessCode = await db.query.accessCodes.findFirst({
      where: eq(accessCodes.code, code),
    })
  } catch (error) {
    return DbAccessCodeResponse.UNKNOWN_ERROR;
  }

  let response: DbAccessCodeResponse = DbAccessCodeResponse.OK;

  if (!accessCode) {
    response = DbAccessCodeResponse.CODE_NOT_FOUND;
    return response;
  }
  if (!accessCode.active) {
    response = DbAccessCodeResponse.CODE_NOT_ACTIVE;
    return response;
  }

  const now = new Date();
  const oldestAllowedCreationDate = new Date(now);
  oldestAllowedCreationDate.setDate(oldestAllowedCreationDate.getDate() - accessCode.expiresAfter);
  if (accessCode.createdAt < oldestAllowedCreationDate) {
    response = DbAccessCodeResponse.CODE_EXPIRED;
    return response;
  }

  if (!accessCode.firstAccessedAt) {
    await db.update(accessCodes)
      .set({ firstAccessedAt: new Date() })
      .where(eq(accessCodes.code, code));
    response = DbAccessCodeResponse.OK_NEW_USER;
  }

  await anonymousSignIn(response);
  return DbAccessCodeResponse.OK;
}

async function anonymousSignIn(dbResponse: DbAccessCodeResponse) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInAnonymously()

  if (error) {
    redirect('/error');
  }

  console.log("Login successful!");

  if (dbResponse == DbAccessCodeResponse.OK_NEW_USER) {
    revalidatePath('/welcome', 'layout');
    redirect('/welcome');
  }
  else {
    revalidatePath('/home', 'layout');
    redirect('/home');
  }
}