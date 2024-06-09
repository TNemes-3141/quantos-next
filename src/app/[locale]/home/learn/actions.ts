"use server";

import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { ValidLocale } from "@/i18n";
import { db } from "@/lib/database/db";
import { chapters, progressRecords } from "@/lib/database/schema";


export type ChapterCardData = {
    id: string;
    title: string;
    description: string;
    difficulty: "advanced" | "easy" | "challenging";
    iconPath: string | null;
    lessons: string[];
}

export type ChapterCardDataReduced = {
    id: string;
    lessons: string[];
}

export type ProgressMap = Map<string, number>;

export async function getChapterCardData(locale: ValidLocale): Promise<ChapterCardData[]> {
    try {
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
    
        return chapterCardData;
    } catch (error) {
        redirect("/error");
    }
}

export async function getChapterCardDataReduced(locale: ValidLocale): Promise<ChapterCardDataReduced[]> {
    try {
        const chapterCardData = await db.select({
            id: chapters.chapterId,
            lessons: chapters.lessons,
        }).from(chapters).where(
            and(
                eq(chapters.locale, locale),
                eq(chapters.active, true)
            )
        ).orderBy(chapters.position);
    
        return chapterCardData;
    } catch (error) {
        redirect("/error");
    }
}

export async function getProgressMap(userId: string, chapterCards: ChapterCardData[] | ChapterCardDataReduced[]): Promise<ProgressMap> {
    try {
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
    
        const chapterProgressMap = new Map<string, number>();
        for (const chapterCard of chapterCards) {
            const totalProgress = chapterCard.lessons.reduce((acc, lessonId) => {
                return acc + (lessonProgressMap.get(lessonId) || 0);
            }, 0);
            const averageProgress = chapterCard.lessons.length > 0 ? totalProgress / chapterCard.lessons.length : 0;
    
            chapterProgressMap.set(chapterCard.id, averageProgress);
        }
    
        return chapterProgressMap;
    } catch (error) {
        redirect("/error");
    }
}