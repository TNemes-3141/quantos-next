"use client";

import LessonCard from "@/components/LessonCard";

import { LessonCardData } from "@/app/[locale]/home/learn/[chapterId]/actions";


type LessonSelectionGridProps = {
    lessons: LessonCardData[],
    readTimeLabel: string,
}

export default function LessonSelectionGrid(props: LessonSelectionGridProps) {
    //grid gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]
    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
            {props.lessons.map((lesson, index) => (
                <LessonCard
                    key={index}
                    lessonId={lesson.id}
                    index={index + 1}
                    title={lesson.title}
                    readTimeLabel={props.readTimeLabel.replace("{{ readTime }}", `${lesson.readTime}`)}
                    progressValue={Math.floor(lesson.progress * 100)}
                    isSquare={false}
                />
            ))}
        </div>
    );
}