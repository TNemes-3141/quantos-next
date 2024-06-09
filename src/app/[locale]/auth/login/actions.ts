'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { LoginResponse } from '@/lib/types'
import { ValidLocale } from '@/i18n'

type SubmitCredentialsResponse = {
  responseCode: LoginResponse,
  errorMessage: string | undefined,
}

export async function login(userEmail: string, userPassword: string, locale: ValidLocale): Promise<SubmitCredentialsResponse | undefined> {
  const supabase = createClient();

  const data = {
    email: userEmail,
    password: userPassword,
  };

  try {
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      return {
        responseCode: LoginResponse.AUTH_API_ERROR,
        errorMessage: error.message,
      };
    }
  } catch (error: any) {
    redirect('/error');
  }

  revalidatePath(`${locale}/home/learn`, 'layout');
  redirect(`${locale}/home/learn`);
}