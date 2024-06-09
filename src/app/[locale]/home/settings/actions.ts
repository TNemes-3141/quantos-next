"use server";

import { db } from "@/lib/database/db";
import { eq } from "drizzle-orm";
import { userData, accessCodes } from "@/lib/database/schema";


export async function getTeamName(userId: string): Promise<string> {
    try {
        const accessCode = await db.query.userData.findFirst({
            columns: {
                registeredAccessCode: true
            },
            where: eq(userData.userId, userId)
        });
    
        if (!accessCode || !accessCode.registeredAccessCode) {
            return "";
        }
    
        const teamName = await db.query.accessCodes.findFirst({
            columns: {
                team: true
            },
            where: eq(accessCodes.code, accessCode.registeredAccessCode)
        });
    
        return teamName?.team ?? "";
    } catch (error) {
        return "";
    }
}