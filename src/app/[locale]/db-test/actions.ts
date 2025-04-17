"use server";

import { db } from "@/lib/database/db";
import { eq } from "drizzle-orm";
import { chapters, lessons } from "@/lib/database/schema";

import { dataHu } from "./outlines";


function makeURLFriendly(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD") // Normalize the string to NFD (Normalization Form D)
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
        .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric characters with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
        .replace(/^-|-$/g, ""); // Remove leading and trailing hyphens
}

export async function postOutline() {
    let chapterPos = 0;

    for (const [lectionId, lectionData] of Object.entries(dataHu)) {
        const chapterId = makeURLFriendly(lectionData.title);
        const chapterData = {
            chapterId,
            locale: "hu",
            title: lectionData.title,
            description: lectionData.description,
            iconPath: `icons-and-thumbnails/${chapterId}/icon.riv`,
            thumbnailPath: `icons-and-thumbnails/${chapterId}/thumbnail.riv`,
            position: chapterPos,
        };

        await db.insert(chapters).values(chapterData);
        const lessonIds = [];

        let position = 0;
        for (const [lessonId, lessonData] of Object.entries(lectionData.content)) {
            const lessonFriendlyId = makeURLFriendly(lessonData.title);
            const lessonDataToInsert = {
                lessonId: lessonFriendlyId,
                chapter: chapterId,
                title: lessonData.title,
                readTime: lessonData.readingtime,
                position
            };

            await db.insert(lessons).values(lessonDataToInsert);
            lessonIds.push(lessonFriendlyId);
            position++;
        }

        // Update the chapter row with the collected lesson IDs
        await db.update(chapters).set({ lessons: lessonIds }).where(eq(chapters.chapterId, chapterId));
        chapterPos++;
    }
}