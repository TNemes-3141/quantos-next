'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { eq } from 'drizzle-orm'

import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/database/db'
import { accessCodes } from '@/lib/database/schema'

enum DbResponse {
  OK,
  OK_NEW_USER,
  CODE_NOT_FOUND,
  CODE_NOT_ACTIVE,
  UNKNOWN_ERROR,
}

export async function submitAccessCode(code: string): Promise<DbResponse> {
  console.log("Querying database for code " + code);
  const accessCode = await db.query.accessCodes.findFirst({
    where: eq(accessCodes.code, code),
  })

  console.log(accessCode);

  //await anonymousSignIn();
  return DbResponse.OK
}

async function anonymousSignIn() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInAnonymously()

  if (error) {
    redirect('/error');
  }

  console.log("Login successful!");

  revalidatePath('/home', 'layout');
  redirect('/home');
}