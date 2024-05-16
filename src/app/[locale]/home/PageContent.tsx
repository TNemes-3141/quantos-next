
import ChapterCard from "@/components/ChapterCard";

import { LocalizedProps } from "@/i18n";
import { DifficultyLevel } from "@/lib/types";
import { cn } from "@/lib/utils";
import { secondary_font } from "@/lib/fonts";
import { getChapterCardData } from "./getChapters";


type PageContentProps = LocalizedProps & {
    userName: string | null | undefined,
}

export default async function PageContent(props: PageContentProps) {
    const chapters = await getChapterCardData(props.locale);

    const dbDifficultyLevelEnumToNativeEnum = (level: "easy" | "advanced" | "challenging"): DifficultyLevel => {
        switch (level) {
            case "easy": return DifficultyLevel.EASY;
            case "advanced": return DifficultyLevel.ADVANCED;
            case "challenging": return DifficultyLevel.CHALLENGING;
        }
    }

    return (
        <div className="flex flex-col space-y-6">
            <p className={cn("text-4xl mx-auto font-bold", secondary_font.className)}>
                {props.userName ?
                    props.translate("learn.greetingWithName", { userName: props.userName }) :
                    props.translate("learn.greetingWithoutName")}
            </p>
            <p className={cn("text-2xl mt-5", secondary_font.className)}>
                {props.translate("learn.subheadingChapters")}
            </p>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">
                {chapters.map((chapter, index) => (<ChapterCard
                    key={index}
                    title={chapter.title}
                    description={chapter.description}
                    difficulty={dbDifficultyLevelEnumToNativeEnum(chapter.difficulty)}
                    iconPath={chapter.iconPath}
                    translate={props.translate}
                />))}
            </div>

        </div>
    );
}