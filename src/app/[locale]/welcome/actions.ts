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

export async function updateUserName(name: string | null) {
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

export async function updateAccountType(type: "student" | "educator", userId: string) {
    try {
        await db.update(userData)
            .set({accountType: type})
            .where(eq(userData.userId, userId));
    } catch (error) {
        redirect("/error");
    }
}

export async function updateAgeGroup(group: "teen" | "young_adult" | "adult" | "elder" | null, userId: string) {
    try {
        await db.update(userData)
            .set({ageGroup: group})
            .where(eq(userData.userId, userId));
    } catch (error) {
        redirect("/error");
    }
}

export async function updateExperienceLevel(level: "beginner" | "advanced" | "skilled", userId: string) {
    try {
        await db.update(userData)
            .set({experienceLevel: level})
            .where(eq(userData.userId, userId));
    } catch (error) {
        redirect("/error");
    }
}