"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "./shadcn-ui/button";
import { ChevronRight, Loader2 } from "lucide-react";


type LessonSelectButtonProps = {
    lessonId: string,
    disabled: boolean,
    onClick: () => void,
}

export default function LessonSelectButton(props: LessonSelectButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        setLoading(true);
        props.onClick();
        router.push(`${pathname}/${props.lessonId}`)
    }

    return (
        <div className="relative">
            <Button
                variant="outline"
                size="icon"
                aria-label="Go to lesson"
                onClick={handleClick}
                disabled={props.disabled}
            >
                <ChevronRight className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Go to lesson</span>
            </Button>
            {loading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Loader2 className="h-[5rem] w-[5rem] animate-spin text-white" />
                </div>
            )}
        </div>
    );
}