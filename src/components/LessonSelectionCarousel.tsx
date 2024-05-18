"use client";

import { useState, useEffect } from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/shadcn-ui/carousel"
import LessonCard from "@/components/LessonCard";

import useMediaQuery from "@/lib/useMediaQuery";
import { LessonCardData } from "@/app/[locale]/home/learn/[chapterId]/getLessons";


type LessonSelectionCarouselProps = {
    lessons: LessonCardData[],
    readTimeLabel: string,
}

export default function LessonSelectionCarousel(props: LessonSelectionCarouselProps) {
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
                    isSquare={false}
                />
            ))}
        </div>
    );
}