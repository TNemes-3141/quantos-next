"use client";

import { useRef, forwardRef, useImperativeHandle } from "react";
import OutlinePanel from "./OutlinePanel";
import { LessonContentProgressBar, LessonContentProgressBarRef } from "./LessonContentProgressBar";
import { Button } from "../shadcn-ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../shadcn-ui/tooltip";
import { Separator } from "../shadcn-ui/separator";
import { BookMarked, ArrowLeft, ArrowRight } from "lucide-react";

import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { OutlineElement } from "@/lib/contentTypes";
import useMediaQuery from "@/lib/useMediaQuery";


type LessonContentNavbarProps = {
    lessonTitle: string,
    lessonPages: number,
    currentPage: number,
    outline: OutlineElement[],
    outlineTooltip: string,
    outlineDescription: string,
    nextPageTooltip: string,
    previousPageTooltip: string,
    closeButtonLabel: string,
    lessonId: string,
    userId: string,
    goToNextPage: () => Promise<void>;
    goToPreviousPage: () => Promise<void>;
    jumpToPage: (page: number) => Promise<void>;
}

export interface LessonContentNavbarRef {
    setProgressToFullAndSave: (userId: string, lessonId: string) => void;
}

export const LessonContentNavbar = forwardRef((props: LessonContentNavbarProps, ref) => {
    const lessonContentProgressBarRef = useRef<LessonContentProgressBarRef>(null);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const onGotoNextPage = async () => {
        scrollToTop();
        lessonContentProgressBarRef.current?.setProgressOnNextPage(props.userId, props.lessonId);
        await props.goToNextPage();
    }

    const onGotoPrevPage = async () => {
        scrollToTop();
        lessonContentProgressBarRef.current?.setProgressOnPreviousPage();
        await props.goToPreviousPage();
    }

    const onJumpToPage = async (page: number) => {
        scrollToTop();
        lessonContentProgressBarRef.current?.setProgressOnJumpPage(props.userId, props.lessonId, page);
        await props.jumpToPage(page);
    }

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useImperativeHandle(ref, () => ({
        setProgressToFullAndSave: (userId: string, lessonId: string) => lessonContentProgressBarRef.current?.setProgressToFullAndSave(userId, lessonId),
    }));


    const outlineButton = <div className="flex-shrink-0">
        <OutlinePanel
            title={props.outlineTooltip}
            text={props.outlineDescription}
            outline={props.outline}
            closeButton={props.closeButtonLabel}
            jumpToPage={onJumpToPage}
        >
            <Button variant="outline" size="icon" aria-label={props.outlineTooltip} className="rounded-full">
                <BookMarked className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">{props.outlineTooltip}</span>
            </Button>
        </OutlinePanel>
    </div>;
    const lessonTitle = <p className={cn("font-bold", secondary_font.className)}>{props.lessonTitle}</p>;
    const progressBar = <LessonContentProgressBar
        numSections={props.lessonPages}
        currentPage={props.currentPage}
        ref={lessonContentProgressBarRef}
    />;
    const previousPageButton = <Tooltip>
        <TooltipTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                aria-label={props.previousPageTooltip}
                className="rounded-full"
                onClick={onGotoPrevPage}
                disabled={props.currentPage == 0}
            >
                <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">{props.previousPageTooltip}</span>
            </Button>
        </TooltipTrigger>
        <TooltipContent>{props.previousPageTooltip}</TooltipContent>
    </Tooltip>;
    const nextPageButton = <Tooltip>
        <TooltipTrigger asChild>
            <Button
                variant="outline"
                size="icon"
                aria-label={props.nextPageTooltip}
                className="rounded-full"
                onClick={onGotoNextPage}
                disabled={props.currentPage == props.lessonPages - 1}
            >
                <ArrowRight className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">{props.nextPageTooltip}</span>
            </Button>
        </TooltipTrigger>
        <TooltipContent>{props.nextPageTooltip}</TooltipContent>
    </Tooltip>;

    if (isDesktop) {
        return (
            <TooltipProvider>
                <div className="sticky z-10 top-12 max-w-[1200px] w-full p-2 rounded-full flex items-center space-x-4 bg-card/50 backdrop-blur-md border-border border h-14">
                    {outlineButton}
                    <div className="flex-shrink-0 h-full">
                        <Separator orientation="vertical" />
                    </div>
                    <div className="flex-grow flex flex-col space-y-2 justify-center items-start">
                        {lessonTitle}
                        {progressBar}
                    </div>
                    <div className="flex-shrink-0 h-full">
                        <Separator orientation="vertical" />
                    </div>
                    <div className="flex-shrink-0 flex space-x-2">
                        {previousPageButton}
                        {nextPageButton}
                    </div>
                </div>
            </TooltipProvider>
        );
    }
    else {
        return (
            <TooltipProvider>
                <div className="sticky z-10 top-6 max-w-[1200px] w-full p-2 rounded-3xl flex flex-col items-stretch space-y-2 bg-card/50 backdrop-blur-md border-border border">
                    <div className="flex items-center gap-2">
                        <div className="flex-shrink-0">
                            {outlineButton}
                        </div>
                        {lessonTitle}
                    </div>
                    <div className="mx-2">
                        {progressBar}
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        {previousPageButton}
                        {nextPageButton}
                    </div>
                </div>
            </TooltipProvider>
        );
    }
});