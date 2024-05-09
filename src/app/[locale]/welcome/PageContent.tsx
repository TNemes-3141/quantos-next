"use client";

import { useAtom } from "jotai";
import { welcomeProgressAtom } from "@/stores/welcomeProgressStore";

import { Progress } from "@/components/shadcn-ui/progress";
import { TranslatorFunction } from "@/i18n";

type PageContentProps = {
    translate: TranslatorFunction,
}

export default function PageContent(props: PageContentProps) {
    const [welcomeProgress, setWelcomeProgress] = useAtom(welcomeProgressAtom);

    return (
        <>
            <Progress value={welcomeProgress} />
            <main className="flex flex-col items-center justify-center p-12 sm:p-20 w-full space-y-12">

            </main>
        </>
    );
}