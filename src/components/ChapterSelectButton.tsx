"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "./shadcn-ui/button";
import { ChevronRight, Loader2 } from "lucide-react";


type ChapterSelectButtonProps = {
    chapterId: string,
    deactivated: boolean,
    onNavigate: () => void,
}

export default function ChapterSelectButton(props: ChapterSelectButtonProps) {
    const [showLoading, setShowLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        setShowLoading(true);
        props.onNavigate();
        router.push(`${pathname}/${props.chapterId}`)
    }

    return (
        <Button
            variant="outline"
            size="icon"
            aria-label="Go to chapter"
            onClick={handleClick}
            disabled={props.deactivated}
        >
            {showLoading ?
                <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin" /> :
                <ChevronRight className="h-[1.2rem] w-[1.2rem]" />
            }
            <span className="sr-only">Go to chapter</span>
        </Button>
    );
}