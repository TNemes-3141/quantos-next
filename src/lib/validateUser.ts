"use server";

import { redirect } from 'next/navigation'
import { User } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server'
import { db } from './database/db';
import { activityRecords, activityTypeEnum } from './database/schema';
import { and, eq, gte, lt } from 'drizzle-orm';

export async function validateUser(): Promise<User> {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        console.log("Auth error: " + error);
        redirect('/auth/login');
    }

    //Record sign-in
    await submitSigninActivity(data.user.id);

    return data.user;
}

export async function submitSigninActivity(userId: string): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingActivityRecord = await db.query.activityRecords.findFirst({
        columns: {
            id: true
        },
        where: and(
            eq(activityRecords.user, userId),
            eq(activityRecords.activityType, activityTypeEnum.enumValues[0]),
            gte(activityRecords.timestamp, today),
            lt(activityRecords.timestamp, new Date(today.getTime() + 86400000)),
        ),
    });

    if (existingActivityRecord) {
        console.log(`Already found an entry for this activity: ${existingActivityRecord.id}`)
        return;
    }

    await db.insert(activityRecords).values({
        user: userId,
        activityType: activityTypeEnum.enumValues[0],
    });
}