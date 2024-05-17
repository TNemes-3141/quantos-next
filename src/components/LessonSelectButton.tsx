"use client";

import { useRouter, usePathname } from "next/navigation";

import { Button } from "./shadcn-ui/button";
import { ChevronRight } from "lucide-react";


type LessonSelectButtonProps = {
    lessonId: string,
}

export default function LessonSelectButton(props: LessonSelectButtonProps) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Button variant="outline" size="icon" aria-label="Go to lesson" onClick={() => router.push(`${pathname}/${props.lessonId}`)}>
            <ChevronRight className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Go to lesson</span>
        </Button>
    );
}