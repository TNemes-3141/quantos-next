"use client";

import { useState, useEffect } from "react";

import ChapterCard from "./ChapterCard";
import { ChapterCardData } from "@/app/[locale]/home/learn/getChapters";
import { DifficultyLevel } from "@/lib/types";


type ChapterSelectionGridProps = {
    chapters: ChapterCardData[],
    strings: {
        easy: string,
        advanced: string,
        challenging: string,
    }
}

export default function ChapterSelectionGrid(props: ChapterSelectionGridProps) {
    const [loading, setLoading] = useState(false);

    const onNavigate = () => {
        setLoading(true);
    }

    const dbDifficultyLevelEnumToNativeEnum = (level: "easy" | "advanced" | "challenging"): DifficultyLevel => {
        switch (level) {
            case "easy": return DifficultyLevel.EASY;
            case "advanced": return DifficultyLevel.ADVANCED;
            case "challenging": return DifficultyLevel.CHALLENGING;
        }
    }

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
            {props.chapters.map((chapter, index) => (<ChapterCard
                key={index}
                chapterId={chapter.id}
                title={chapter.title}
                description={chapter.description}
                difficulty={dbDifficultyLevelEnumToNativeEnum(chapter.difficulty)}
                iconPath={chapter.iconPath}
                progress={Math.floor(chapter.progress * 100)}
                difficultyEasy={props.strings.easy}
                difficultyAdvanced={props.strings.advanced}
                difficultyChallenging={props.strings.challenging}
                deactivated={loading}
                onNavigateCallback={onNavigate}
            />))}
        </div>
    );
}