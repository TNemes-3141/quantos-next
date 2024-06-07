import ChapterSelectionGrid from "@/components/ChapterSelectionGrid";

import { LocalizedProps } from "@/i18n";
import { cn } from "@/lib/utils";
import { secondary_font } from "@/lib/fonts";
import { getChapterCardData } from "./actions";


type PageContentProps = LocalizedProps & {
    userName: string | null | undefined,
    userId: string,
}

export default async function PageContent(props: PageContentProps) {
    const chapters = await getChapterCardData(props.userId, props.locale);

    return (
        <div className="flex flex-col space-y-6">
            <p className={cn("text-4xl mx-auto font-bold text-center", secondary_font.className)}>
                {props.userName ?
                    props.translate("learn.greetingWithName", { userName: props.userName }) :
                    props.translate("learn.greetingWithoutName")}
            </p>
            <p className={cn("text-2xl mt-5", secondary_font.className)}>
                {props.translate("learn.subheadingChapters")}
            </p>
            <ChapterSelectionGrid
                userId={props.userId}
                chapters={chapters}
                strings={{
                    easy: props.translate("learn.difficultyEasy"),
                    advanced: props.translate("learn.difficultyAdvanced"),
                    challenging: props.translate("learn.difficultyChallenging"),
                }}
            />
        </div>
    );
}