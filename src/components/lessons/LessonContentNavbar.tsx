"use client";

import OutlinePanel from "./OutlinePanel";
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
    goToNextPage: () => Promise<void>;
    goToPreviousPage: () => Promise<void>;
    jumpToPage: (page: number) => Promise<void>;
}

export default function LessonContentNavbar(props: LessonContentNavbarProps) {
    
    const onGotoNextPage = async () => {

        await props.goToNextPage();
    }

    const onGotoPrevPage = async () => {

        await props.goToPreviousPage();
    }

    const onJumpToPage = async (page: number) => {

        await props.jumpToPage(page);
    }

    return (
        <TooltipProvider>
            <div className="sticky top-12 mx-auto w-full p-2 rounded-full flex items-center space-x-4 bg-card border-border border h-14">
                <div className="flex-shrink-0">
                    <OutlinePanel
                        title={props.outlineTooltip}
                        text={props.outlineDescription}
                        outline={props.outline}
                        closeButton={props.closeButtonLabel}
                        jumpToPage={onJumpToPage}>
                        <Button variant="outline" size="icon" aria-label={props.outlineTooltip} className="rounded-full">
                            <BookMarked className="h-[1.2rem] w-[1.2rem]" />
                            <span className="sr-only">{props.outlineTooltip}</span>
                        </Button>
                    </OutlinePanel>
                </div>
                <div className="flex-shrink-0 h-full">
                    <Separator orientation="vertical" />
                </div>
                <div className="flex-grow flex flex-col space-y-2">
                    <p className={cn("font-bold", secondary_font.className)}>{props.lessonTitle}</p>
                </div>
                <div className="flex-shrink-0 h-full">
                    <Separator orientation="vertical" />
                </div>
                <div className="flex-shrink-0 flex space-x-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label={props.previousPageTooltip}
                                className="rounded-full"
                                onClick={onGotoPrevPage}
                                disabled={props.currentPage == 0}>
                                <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
                                <span className="sr-only">{props.previousPageTooltip}</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{props.previousPageTooltip}</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                aria-label={props.nextPageTooltip} 
                                className="rounded-full"
                                onClick={onGotoNextPage}
                                disabled={props.currentPage == props.lessonPages - 1}>
                                <ArrowRight className="h-[1.2rem] w-[1.2rem]" />
                                <span className="sr-only">{props.nextPageTooltip}</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>{props.nextPageTooltip}</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    );
}