'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function submitAccessCode(code: string) {
    

    await anonymousSignIn();
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