'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function signup(userEmail: string, userPassword: string) {
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

  revalidatePath('/welcome', 'layout');
  redirect('/welcome');
}