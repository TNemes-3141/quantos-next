"use client";

import { useAtom } from "jotai";
import { welcomeProgressAtom } from "@/stores/welcomeProgressStore";

import { Progress } from "@/components/shadcn-ui/progress";
import { ValidLocale, getTranslator } from "@/i18n";

type PageContentProps = {
    strings: LocalizedStrings
}

export type LocalizedStrings = {
    nextPageButton: string,
    previousPageButton: string
    welcomePage: {
        title: string
        question: string
    },
    namePage: {
        title: string
        question: string
        placeholder: string
    },
    accountTypePage: {
        titleWithName: string
        titleWithoutName: string
        optionStudentTitle: string
        optionStudentDescription: string
        optionTeacherTitle: string
        optionTeacherDescription: string
    },
    agePage: {
        title: string
        description: string
        optionNotSpecified: string
        optionTeen: string
        optionYoungAdult: string
        optionAdult: string
        optionElder: string
    },
    experiencePage: {
        title: string
        description: string
        optionBeginner: string
        optionAdvanced: string
        optionSkilled: string
    },
    finalPage: {
        title: string
    }
}

export default function PageContent(props: PageContentProps) {
    const [welcomeProgress, setWelcomeProgress] = useAtom(welcomeProgressAtom);

    return (
        <div className="flex flex-col items-center justify-start">
            <Progress className="mx-20 mt-12 w-[60%]" value={welcomeProgress} />
            <main className="flex flex-col items-center justify-center p-12 sm:p-20 w-full space-y-12">
                {props.strings.accountTypePage.titleWithName}
            </main>
        </div>
    );
}