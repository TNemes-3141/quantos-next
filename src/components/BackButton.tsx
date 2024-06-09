"use client";

import { useRouter } from "next/navigation";

import { Button } from "./shadcn-ui/button";
import { ArrowLeft } from "lucide-react";


type BackButtonProps = {
    label: string,
}

export default function BackButton(props: BackButtonProps) {
    const router = useRouter();

    return (
        <Button variant="outline" size="icon" aria-label={props.label} onClick={() => router.back()}>
            <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">{props.label}</span>
        </Button>
    );
}