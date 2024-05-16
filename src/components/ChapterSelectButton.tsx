"use client";

import { useRouter, usePathname } from "next/navigation";

import { Button } from "./shadcn-ui/button";
import { ChevronRight } from "lucide-react";


type ChapterSelectButtonProps = {
    chapterId: string,
}

export default function ChapterSelectButton(props: ChapterSelectButtonProps) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Button variant="outline" size="icon" aria-label="Go to chapter" onClick={() => router.push(`${pathname}/${props.chapterId}`)}>
            <ChevronRight className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Go to chapter</span>
        </Button>
    );
}