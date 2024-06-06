"use client";

import { useState, useEffect } from "react";

import LessonCard from "@/components/LessonCard";
import { getProgressMap, LessonCardData, ProgressMap } from "@/app/[locale]/home/learn/[chapterId]/actions";


type LessonSelectionGridProps = {
    userId: string,
    chapterId: string,
    lessons: LessonCardData[],
    readTimeLabel: string,
}

export default function LessonSelectionGrid(props: LessonSelectionGridProps) {
    //grid gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]
    const [progressMap, setProgressMap] = useState<ProgressMap>({});

    const fetchProgressData = async () => {
        const map = await getProgressMap(props.userId);
        setProgressMap(map);
    };

    useEffect(() => {
        fetchProgressData();
    }, [props.chapterId]);

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
            {props.lessons.map((lesson, index) => (
                <LessonCard
                    key={index}
                    lessonId={lesson.id}
                    index={index + 1}
                    title={lesson.title}
                    readTimeLabel={props.readTimeLabel.replace("{{ readTime }}", `${lesson.readTime}`)}
                    progressValue={Math.floor((progressMap[lesson.id] || 0) * 100)}
                    isSquare={false}
                />
            ))}
        </div>
    );
}