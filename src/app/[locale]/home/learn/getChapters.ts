"use server";

import { eq, and, sql } from "drizzle-orm";
import { ValidLocale } from "@/i18n";
import { db } from "@/lib/database/db";
import { chapters, progressRecords } from "@/lib/database/schema";


export type ChapterCardData = {
    id: string,
    title: string;
    description: string;
    difficulty: "advanced" | "easy" | "challenging";
    iconPath: string | null;
    progress: number;
}

export async function getChapterCardData(userId: string, locale: ValidLocale): Promise<ChapterCardData[]> {
    const chapterCardData = await db.select({
        id: chapters.chapterId,
        title: chapters.title,
        description: chapters.description,
        difficulty: chapters.difficulty,
        iconPath: chapters.iconPath,
        lessons: chapters.lessons,
    }).from(chapters).where(
        and(
            eq(chapters.locale, locale),
            eq(chapters.active, true)
        )
    ).orderBy(chapters.position);

    const lessonProgressData = await db.select({
        lesson: progressRecords.lesson,
        progress: progressRecords.progress
    }).from(progressRecords).where(
        eq(progressRecords.user, userId)
    );

    // Create a map of lesson progress
    const lessonProgressMap = new Map<string, number>();
    for (const record of lessonProgressData) {
        if (lessonProgressMap.has(record.lesson)) {
            lessonProgressMap.set(record.lesson, lessonProgressMap.get(record.lesson)! + record.progress);
        } else {
            lessonProgressMap.set(record.lesson, record.progress);
        }
    }

    return chapterCardData.map(chapter => {
        const totalProgress = chapter.lessons.reduce((acc, lessonId) => {
            return acc + (lessonProgressMap.get(lessonId) || 0);
        }, 0);
        const averageProgress = chapter.lessons.length > 0 ? totalProgress / chapter.lessons.length : 0;

        return {
            id: chapter.id,
            title: chapter.title,
            description: chapter.description,
            difficulty: chapter.difficulty,
            iconPath: chapter.iconPath,
            progress: averageProgress,
        };
    });
}