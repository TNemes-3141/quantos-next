"use server";

import { eq, and } from "drizzle-orm";

import { ValidLocale } from "@/i18n";
import { db } from "@/lib/database/db";
import { lessons } from "@/lib/database/schema";


type LessonCardData = {
    id: string,
    title: string,
    readTime: number
}

export async function getLessonCardData(chapterId: string): Promise<LessonCardData[]> {
    const result = await db.select({
        id: lessons.lessonId,
        title: lessons.title,
        readTime: lessons.readTime,
    }).from(lessons).where(
        and(
            eq(lessons.chapter, chapterId),
            eq(lessons.active, true)
        )
    ).orderBy(lessons.position);

    return result;
}