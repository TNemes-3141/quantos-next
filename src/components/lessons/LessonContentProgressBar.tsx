"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import { Progress } from "../shadcn-ui/progress";


type LessonContentProgressBarProps = {
    numSections: number,
    currentPage: number,
}

export interface LessonContentProgressBarRef {
    setProgressOnNextPage: () => void,
    setProgressOnPreviousPage: () => void,
    setProgressOnJumpPage: (page: number) => void,
    setProgressToFullAndSave: () => void;
    saveProgress: () => void;
}

export const LessonContentProgressBar = forwardRef((props: LessonContentProgressBarProps, ref) => {
    const [completedSections, setCompletedSections] = useState(0);
    const [progressCurrent, setProgressCurrent] = useState(0);

    useImperativeHandle(ref, () => ({
        setProgressOnNextPage: () => {
            if (props.currentPage == completedSections) {
                setCompletedSections(completedSections + 1);
            }
            setProgressCurrent(0);
        },
        setProgressOnPreviousPage: () => {
            setProgressCurrent(0);
        },
        setProgressOnJumpPage: (page: number) => {
            if (page > completedSections) {
                setCompletedSections(page);
            }
            setProgressCurrent(0);
        },
        setProgressToFullAndSave: () => {
            setCompletedSections(props.numSections);
        },
        saveProgress: () => {
            //...
        }
    }));

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);

            setProgressCurrent(scrollPercentage);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className="grid gap-2 w-full max-w-[600px]"
            style={{ gridTemplateColumns: `repeat(${props.numSections}, minmax(0, 1fr))` }}
        >
            {Array.from({ length: props.numSections }).map((_, index) => (
                <div key={index} className="flex justify-center items-center">
                    <Progress
                        value={index < completedSections ? 100 : (index == completedSections && index == props.currentPage ? progressCurrent : 0)}
                        className="w-full h-[8px]"
                    />
                </div>
            ))}
        </div>
    );
});