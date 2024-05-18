"use server";

import { eq, and } from "drizzle-orm";

import { DifficultyLevel } from "@/lib/types";
import { db } from "@/lib/database/db";
import { chapters, lessons } from "@/lib/database/schema";
import { redirect } from "next/navigation";


export type LessonCardData = {
    id: string,
    title: string,
    readTime: number
}

export type ChapterData = {
    title: string,
    description: string,
    difficulty: DifficultyLevel,
    thumbnailPath: string | null,
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

export async function getChapterData(chapterId: string): Promise<ChapterData> {
    try {
        const result = await db.query.chapters.findFirst({
            columns: {
                title: true,
                description: true,
                difficulty: true,
                thumbnailPath: true,
            },
            where: eq(chapters.chapterId, chapterId),
        });

        if (!result) {
            redirect("/error");
        }

        let difficulty: DifficultyLevel;
        switch (result.difficulty) {
            case "easy": difficulty = DifficultyLevel.EASY;
            break;
            case "advanced": difficulty = DifficultyLevel.ADVANCED;
            break;
            case "challenging": difficulty = DifficultyLevel.CHALLENGING;
            break;
        }

        return {
            title: result.title,
            description: result.description,
            difficulty: difficulty,
            thumbnailPath: result.thumbnailPath,
        }
    } catch (error) {
        redirect("/error");
    }
}