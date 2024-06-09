"use server";

import { redirect } from "next/navigation";
import { eq, and, gte, lt } from "drizzle-orm";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/database/db";
import { chapters, lessons, progressRecords, activityRecords, activityTypeEnum } from "@/lib/database/schema";
import {
    LessonContent,
    LessonContentElement,
    OutlineElement,
    ParagraphElement,
    SectionTitleElement,
    ImageElement,
    EquationElement,
    InteractiveElement,
    InteractiveComponentElement
} from "@/lib/contentTypes";
import { ContentElementType, ImageModifier } from "@/lib/types";
import { ValidLocale } from "@/i18n";


type BreadcrumbData = {
    chapterTitle: string,
    lessonTitle: string,
}

export async function createProgressEntryIfNotPresent(userId: string, lessonId: string): Promise<void> {
    try {
        const existingProgressEntry = await db.query.progressRecords.findFirst({
            columns: {
                id: true,
            },
            where: and(
                eq(progressRecords.lesson, lessonId),
                eq(progressRecords.user, userId)
            ),
        });
        if (existingProgressEntry) {
            return;
        }

        const lesson = await db.query.lessons.findFirst({
            columns: {
                linkedLessons: true,
            },
            where: eq(lessons.lessonId, lessonId),
        });
        if (!lesson) {
            redirect("/error");
        }
        if (!lesson.linkedLessons) {
            lesson.linkedLessons = [];
        }

        const allLessonIds = [lessonId, ...lesson.linkedLessons];
        const progressEntries = allLessonIds.map(id => ({
            user: userId,
            lesson: id,
        }));

        await db.insert(progressRecords).values(progressEntries);
    } catch (error) {
        return;
    }
}

export async function updateProgress(userId: string, lessonId: string, newProgress: number): Promise<void> {
    try {
        const existingProgressEntry = await db.query.progressRecords.findFirst({
            columns: {
                progress: true,
            },
            where: and(
                eq(progressRecords.lesson, lessonId),
                eq(progressRecords.user, userId)
            ),
        });
        if (!existingProgressEntry) {
            return;
        }
        if (newProgress < existingProgressEntry.progress) {
            return;
        }

        const lesson = await db.query.lessons.findFirst({
            columns: {
                linkedLessons: true,
            },
            where: eq(lessons.lessonId, lessonId),
        });
        if (!lesson) {
            redirect("/error");
        }
        if (!lesson.linkedLessons) {
            lesson.linkedLessons = [];
        }

        const allLessonIds = [lessonId, ...lesson.linkedLessons];
        for (const id of allLessonIds) {
            await db.update(progressRecords)
                .set({ progress: newProgress })
                .where(and(eq(progressRecords.user, userId), eq(progressRecords.lesson, id)));
        }

        if (newProgress === 1) {
            await submitCompleteLessonActivity(userId, lessonId);
        }
    } catch (error) {
        return;
    }
}

export async function submitCompleteLessonActivity(userId: string, lessonId: string): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log(`User ID: ${userId}; lesson ID: ${lessonId}`);

    const existingActivityRecord = await db.query.activityRecords.findFirst({
        columns: {
            id: true
        },
        where: and(
            eq(activityRecords.user, userId),
            eq(activityRecords.activityType, activityTypeEnum.enumValues[1]),
            eq(activityRecords.lesson, lessonId),
        ),
    });

    if (existingActivityRecord) {
        console.log(`Already found an entry for this activity: ${existingActivityRecord.id}`)
        return;
    }

    await db.insert(activityRecords).values({
        user: userId,
        activityType: activityTypeEnum.enumValues[1],
        lesson: lessonId,
    });
}

export async function getBreadcrumbData(chapterId: string, lessonId: string): Promise<BreadcrumbData> {
    try {
        const chapter = await db.query.chapters.findFirst({
            columns: {
                title: true,
            },
            where: eq(chapters.chapterId, chapterId),
        });
        if (!chapter) {
            redirect("/error");
        }

        const lesson = await db.query.lessons.findFirst({
            columns: {
                title: true,
            },
            where: eq(lessons.lessonId, lessonId),
        });
        if (!lesson) {
            redirect("/error");
        }

        return {
            chapterTitle: chapter.title,
            lessonTitle: lesson.title,
        }
    } catch (error) {
        redirect("/error");
    }
}

export async function getLessonContentElements(locale: ValidLocale, chapterId: string, lessonId: string): Promise<LessonContent> {
    const supabase = createClient();
    const jsonLocation = `${locale}/${chapterId}/${lessonId}.json`;

    const { data, error } = await supabase.storage
        .from("learning-content")
        .download(jsonLocation);

    if (error) {
        redirect("/error");
    }

    const lessonJson = await data.text();
    const lessonData = JSON.parse(lessonJson);

    try {
        const outlineElements: OutlineElement[] = parseOutlineElements(lessonData);
        const pageContents: LessonContentElement[][] = parseLessonContent(lessonData);

        return { outlineElements, pageContents };
    } catch (error) {
        console.log(error);
        redirect("/error");
    }
}

function parseOutlineElements(jsonData: any): OutlineElement[] {
    return jsonData.outline.map((outlineItem: any) => ({
        sectiontitle: outlineItem.sectiontitle,
        pagenumber: outlineItem.pagenumber
    }));
}

function parseLessonContent(jsonData: any): LessonContentElement[][] {
    return jsonData.pages.map((page: any) =>
        page.elements.map((element: any) => {
            const typeStrings = (element.type as String).split(":");

            switch (typeStrings[0]) {
                case 'paragraph': return parseParagraph(element);
                case 'sectiontitle': return parseSectionTitle(element);
                case 'image': return parseImage(element, typeStrings);
                case 'equation': return parseEquation(element);
                case 'interactive': return parseInteractive(element);
                case 'interactivecomponent': return parseInteractiveComponent(element);
                default:
                    throw new Error(`Unknown content type: ${element.type}`);
            }
        })
    );
}

// CONTENT ELEMENTS

function parseParagraph(element: any): ParagraphElement {
    return { type: ContentElementType.PARAGRAPH, text: element.text } as ParagraphElement;
}

function parseSectionTitle(element: any): SectionTitleElement {
    return { type: ContentElementType.SECTION_TITLE, title: element.title } as SectionTitleElement;
}

function parseImage(element: any, modifier: string[]): ImageElement {
    let mod = null;
    if (modifier.length > 1) {
        switch (modifier[1]) {
            case "dark":
                mod = ImageModifier.DARK;
                break;
            case "light":
                mod = ImageModifier.LIGHT;
                break;
        }
    }

    return { type: ContentElementType.IMAGE, modifier: mod, asset: element.asset, caption: element.caption, alttext: element.alttext } as ImageElement;
}

function parseEquation(element: any): EquationElement {
    return { type: ContentElementType.EQUATION, tex: element.tex, alttext: element.alttext } as EquationElement;
}

function parseInteractive(element: any): InteractiveElement {
    return { type: ContentElementType.INTERACTIVE, asset: element.asset, caption: element.caption, alttext: element.alttext } as InteractiveElement;
}

function parseInteractiveComponent(element: any): InteractiveComponentElement {
    return {
        type: ContentElementType.INTERACTIVE_COMPONENT,
        asset: element.asset,
        component: element.component,
        caption: element.caption,
        alttext: element.alttext
    } as InteractiveComponentElement;
}