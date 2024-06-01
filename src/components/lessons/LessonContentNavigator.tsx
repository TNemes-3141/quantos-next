"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SupabaseClient } from '@supabase/supabase-js';
import { LessonContentNavbar, LessonContentNavbarRef } from "./LessonContentNavbar";
import LessonContentRenderer from "./LessonContentRenderer";
import LessonFinishPanel from "./LessonFinishPanel";

import { LessonContent, LessonContentElement, ImageElement } from "@/lib/contentTypes";
import { ContentElementType } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";


type LessonContentNavigatorProps = {
    title: string,
    content: LessonContent,
    strings: {
        outlineTooltip: string,
        outlineDescription: string,
        nextPageTooltip: string,
        previousPageTooltip: string,
        closeButtonLabel: string,
        finishLessonText: string,
        finishButtonLabel: string,
        ratingQuestion: string,
    }
}

const fetchImageUrls = async (elements: LessonContentElement[], client: SupabaseClient): Promise<string[]> => {
    return Promise.all(
        elements.map(async (element) => {
            if (element.type === ContentElementType.IMAGE) {
                const { data, error } = await client.storage
                    .from('lesson-materials')
                    .createSignedUrl((element as ImageElement).asset, 60); // URL valid for 60 seconds
                if (error) {
                    console.error('Error fetching image URL:', error);
                    return '';
                }
                return data.signedUrl;
            }
            return '';
        })
    );
};

export default function LessonContentNavigator(props: LessonContentNavigatorProps) {
    const lessonContentNavbarRef = useRef<LessonContentNavbarRef>(null);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);
    const [animationState, setAnimationState] = useState<"enter" | "exit">("enter");
    const [elements, setElements] = useState<LessonContentElement[]>(props.content.pageContents[currentPage]);
    const totalPages = props.content.pageContents.length;

    useEffect(() => {
        const loadUrls = async (elements: LessonContentElement[]) => {
            const urls = await fetchImageUrls(elements, supabase);
            setImageUrls(urls);
        };

        setAnimationState("enter");
        setElements(props.content.pageContents[currentPage]);
        loadUrls(props.content.pageContents[currentPage]);
    }, [currentPage]);

    const supabase = createClient();
    const [imageUrls, setImageUrls] = useState<string[]>([]);


    const goToNextPage = async () => {
        if (currentPage < totalPages - 1) {
            setAnimationState('exit');
            setTimeout(() => {
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);
                setImageUrls([]);
            }, 300); // Match timeout to animation duration
        }
    };

    const goToPreviousPage = async () => {
        if (currentPage > 0) {
            setAnimationState('exit');
            setTimeout(() => {
                const prevPage = currentPage - 1;
                setCurrentPage(prevPage);
                setImageUrls([]);
            }, 300); // Match timeout to animation duration
        }
    };

    const jumpToPage = async (page: number) => {
        if (page >= 0 && page < totalPages) {
            setAnimationState('exit');
            setTimeout(() => {
                setCurrentPage(page);
                setImageUrls([]);
            }, 300);
        }
    }

    const onFinish = async () => {
        lessonContentNavbarRef.current?.setProgressToFullAndSave();
        setTimeout(() => {
            router.back();
        }, 500);
    }

    return (
        <div className="flex flex-col space-y-6 items-center">
            <LessonContentNavbar
                ref={lessonContentNavbarRef}
                lessonTitle={props.title}
                lessonPages={totalPages}
                currentPage={currentPage}
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
            <div className={cn("max-w-[1000px]", animationState === 'enter' ? 'animate-fade-in' : 'animate-fade-out')}>
                <LessonContentRenderer elements={elements} imageUrls={imageUrls} />
                <div className="flex justify-center mt-12">
                    {currentPage === totalPages - 1 ? <LessonFinishPanel
                        finishLessonText={props.strings.finishLessonText}
                        finishButtonLabel={props.strings.finishButtonLabel}
                        ratingQuestion={props.strings.ratingQuestion}
                        onFinish={onFinish}
                    /> : null}
                </div>
            </div>
        </div>
    );
}