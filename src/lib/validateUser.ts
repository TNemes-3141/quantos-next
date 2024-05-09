"use server";

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { User } from '@supabase/supabase-js';

export async function validateUser(): Promise<User> {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        console.log("Error: " + error);
        redirect('/auth/login');
    }

    return data.user;
}