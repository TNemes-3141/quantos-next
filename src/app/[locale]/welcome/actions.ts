"use server";

import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';

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