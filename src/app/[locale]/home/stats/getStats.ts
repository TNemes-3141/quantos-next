"use server";

import { eq, and, gte } from "drizzle-orm";
import { format } from 'date-fns';

import { db } from "@/lib/database/db";
import { activityRecords, activityTypeEnum } from "@/lib/database/schema";
import { ValidLocale } from "@/i18n";
import { ProgressMap } from "../learn/actions";
import { getChapterCardDataReduced, getProgressMap } from "../learn/actions";


export type UserStats = {
    progressPerChapter: ProgressMap,
    signInActivity: { date: string; count: 1; }[],
    lessonCompleteActivity: number[],
}

export async function getStats(userId: string, locale: ValidLocale): Promise<UserStats> {
    const chapterData = await getChapterCardDataReduced(locale);
    const progressMap = await getProgressMap(userId, chapterData);

    //Produce SOD date from 30 days ago (including today); all activities from this point onwards should be queried
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setHours(0, 0, 0, 0);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);

    const signInActivities = await db.select({
        timestamp: activityRecords.timestamp,
    }).from(activityRecords).where(
        and(
            eq(activityRecords.user, userId),
            eq(activityRecords.activityType, activityTypeEnum.enumValues[0]),
            gte(activityRecords.timestamp, thirtyDaysAgo)
        )
    ).orderBy(activityRecords.timestamp);

    //Produce SOD date from 7 days ago (including today) for the "lesson_completed" activities
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setHours(0, 0, 0, 0);
    sevenDaysAgo.setDate(thirtyDaysAgo.getDate() - 6);

    const lessonCompleteActivies = await db.select({
        timestamp: activityRecords.timestamp,
    }).from(activityRecords).where(
        and(
            eq(activityRecords.user, userId),
            eq(activityRecords.activityType, activityTypeEnum.enumValues[1]),
            gte(activityRecords.timestamp, sevenDaysAgo)
        )
    ).orderBy(activityRecords.timestamp);

    return {
        progressPerChapter: progressMap,
        signInActivity: transformSignInActivities(signInActivities),
        lessonCompleteActivity: transformLessonCompleteActivities(lessonCompleteActivies),
    };
}

const transformSignInActivities = (activities: { timestamp: Date }[]): { date: string; count: 1; }[] => {
    return activities.map(activity => ({
        date: format(activity.timestamp, 'yyyy-MM-dd'),
        count: 1
    }));
};

const transformLessonCompleteActivities = (activities: { timestamp: Date }[]): number[] => {
    const days = Array(7).fill(0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    activities.forEach(activity => {
        const activityDate = new Date(activity.timestamp);
        activityDate.setHours(0, 0, 0, 0);

        const dayDifference = Math.floor((today.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dayDifference >= 0 && dayDifference < 7) {
            days[6 - dayDifference]++;
        }
    });

    return days;
};