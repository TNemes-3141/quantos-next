"use server";

import { eq, and } from "drizzle-orm";
import { ValidLocale } from "@/i18n";
import { db } from "@/lib/database/db";
import { chapters } from "@/lib/database/schema";


type ChapterCardData = {
    id: string,
    title: string;
    description: string;
    difficulty: "advanced" | "easy" | "challenging";
    iconPath: string | null;
}

export async function getChapterCardData(locale: ValidLocale): Promise<ChapterCardData[]> {
    const result = await db.select({
        id: chapters.chapterId,
        title: chapters.title,
        description: chapters.description,
        difficulty: chapters.difficulty,
        iconPath: chapters.iconPath,
    }).from(chapters).where(
        and(
            eq(chapters.locale, locale),
            eq(chapters.active, true)
        )
    ).orderBy(chapters.position);

    return result;
}