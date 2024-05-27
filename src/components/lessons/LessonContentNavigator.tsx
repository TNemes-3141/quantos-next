"use client";

import { useState, useEffect } from "react";
import LessonContentNavbar from "./LessonContentNavbar";

import { LessonContent } from "@/lib/contentTypes";


type LessonContentNavigatorProps = {
    title: string,
    content: LessonContent,
    strings: {
        outlineTooltip: string,
        outlineDescription: string,
        nextPageTooltip: string,
        previousPageTooltip: string,
        closeButtonLabel: string,
    }
}

export default function LessonContentNavigator(props: LessonContentNavigatorProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [animationState, setAnimationState] = useState<"enter" | "exit">("enter");
    const totalPages = props.content.pageContents.length;

    useEffect(() => {
        setAnimationState("enter");
    }, [currentPage]);

    const goToNextPage = async () => {
        if (currentPage < totalPages - 1) {
            setAnimationState('exit');
            setTimeout(() => {
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);
                //props.setProgress(nextQuestion + 1);
            }, 300); // Match timeout to animation duration
        }
    };

    const goToPreviousPage = async () => {
        if (currentPage > 0) {
            setAnimationState('exit');
            setTimeout(() => {
                const prevPage = currentPage - 1;
                setCurrentPage(prevPage);
                //props.setProgress(prevQuestion + 1);
            }, 300); // Match timeout to animation duration
        }
    };

    const jumpToPage = async (page: number) => {
        if (page >= 0 && page < totalPages) {
            setAnimationState('exit');
            setTimeout(() => {
                setCurrentPage(page);
                //props.setProgress(nextQuestion + 1);
            }, 300);
        }
    }

    return (
        <div className="flex flex-col space-y-6">
            <LessonContentNavbar
                lessonTitle={props.title}
                lessonPages={totalPages}
                outline={props.content.outlineElements}
                outlineTooltip={props.strings.outlineTooltip}
                outlineDescription={props.strings.outlineDescription}
                nextPageTooltip={props.strings.nextPageTooltip}
                previousPageTooltip={props.strings.previousPageTooltip}
                closeButtonLabel={props.strings.closeButtonLabel}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                jumpToPage={jumpToPage}
            />
        </div>
    );
}