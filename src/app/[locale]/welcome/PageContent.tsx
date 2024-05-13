"use client";

import { useAtom, useSetAtom } from "jotai";
import { welcomeProgressAtom } from "@/stores/welcomeProgressStore";
import { userIdAtom } from "@/stores/userDataStore";

import WelcomeQuestionnaire from "@/components/WelcomeQuestionnaire";
import { Progress } from "@/components/shadcn-ui/progress";
import { WelcomeLocalizedStrings } from "@/lib/types";

type PageContentProps = {
    strings: WelcomeLocalizedStrings,
    userId: string,
}

export default function PageContent(props: PageContentProps) {
    const [welcomeProgress, setWelcomeProgress] = useAtom(welcomeProgressAtom);
    const setUserId = useSetAtom(userIdAtom);

    setUserId(props.userId);

    return (
        <div className="flex flex-col items-center justify-start">
            <Progress className="mx-20 mt-12 w-[60%]" value={welcomeProgress} />
            <main className="flex flex-col items-center justify-center p-12 sm:p-20 w-full space-y-12">
                <WelcomeQuestionnaire strings={props.strings} setProgress={setWelcomeProgress}/>
            </main>
        </div>
    );
}