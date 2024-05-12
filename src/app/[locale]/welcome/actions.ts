"use server";

import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

import { createClient } from '@/lib/supabase/server';
import { db } from '@/lib/database/db';
import { User } from '@supabase/supabase-js';
import { userData } from '@/lib/database/schema';

export async function createUserEntryIfMissing(user: User) {
    if (!user) {
        return;
    }

    try {
        const userRow = await db.query.userData.findFirst({
            where: eq(userData.userId, user.id),
        })

        if (!userRow) {
            await db.insert(userData).values({userId: user.id});
        }
    } catch (error) {
        redirect("/error");
    }
}

export async function updateUserName(name: string) {
    const supabase = createClient();
    
    const { data, error } = await supabase.auth.updateUser({
        data: {
            display_name: name
        }
    })

    if (error) {
        redirect("/error");
    }

    try {
        await db.update(userData)
            .set({displayName: name})
            .where(eq(userData.userId, data.user.id));
    } catch (error) {
        redirect("/error");
    }
}