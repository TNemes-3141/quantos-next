'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { ValidLocale } from '@/i18n'

export async function signup(userEmail: string, userPassword: string, locale: ValidLocale) {
  const supabase = createClient();

  const data = {
    email: userEmail,
    password: userPassword,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  console.log("Signup successful!");

  revalidatePath(`/${locale}/welcome`, 'layout');
  redirect(`/${locale}/welcome`);
}