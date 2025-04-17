"use server";

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { ValidLocale } from '@/i18n'

export async function anonymousSignIn(locale: ValidLocale) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInAnonymously()

    if (error) {
        console.log(error);
        redirect(`/error`);
    }

    revalidatePath(`/${locale}/welcome`, 'layout');
    redirect(`/${locale}/welcome`); //TODO: Fix this
}