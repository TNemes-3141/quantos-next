import LessonSelectionCarousel from "@/components/LessonSelectionCarousel";
import BackButton from "@/components/BackButton";
import LearnBreadcrumbs from "@/components/LearnBreadcrumbs";
import ChapterThumbnailAnimation from "@/components/ChapterThumbnailAnimation";
import { Badge } from "@/components/shadcn-ui/badge";
import { Skeleton } from "@/components/shadcn-ui/skeleton";

import { LocalizedProps } from "@/i18n";
import { cn } from "@/lib/utils";
import { secondary_font } from "@/lib/fonts";
import { DifficultyLevel } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { getChapterData, getLessonCardData } from "./getLessons";


type PageContentProps = LocalizedProps & {
    chapterId: string,
}

function splitToBucketAndPath(input: string): { bucket: string, resourcePath: string | null } {
    const firstSlashIndex = input.indexOf('/');
    if (firstSlashIndex === -1) {
        return { bucket: input, resourcePath: null }; // No slash found, return input as 'before' and empty string as 'after'
    }
    const before = input.substring(0, firstSlashIndex);
    const after = input.substring(firstSlashIndex + 1);
    return { bucket: before, resourcePath: after };
}

export default async function PageContent(props: PageContentProps) {
    const lessons = await getLessonCardData(props.chapterId);
    const chapterData = await getChapterData(props.chapterId);

    const supabase = createClient();
    const { bucket, resourcePath } = splitToBucketAndPath(chapterData.thumbnailPath ?? "");
    let publicUrl: string | null = null;
    if (chapterData.thumbnailPath && resourcePath) {
        const { data } = supabase.storage.from(bucket).getPublicUrl(resourcePath);
        publicUrl = data.publicUrl;
    }

    const difficultyLevelToLocalizedString = (level: DifficultyLevel): string => {
        switch (level) {
            case DifficultyLevel.EASY: return props.translate("learn.difficultyEasy");
            case DifficultyLevel.ADVANCED: return props.translate("learn.difficultyAdvanced");
            case DifficultyLevel.CHALLENGING: return props.translate("learn.difficultyChallenging");
        }
    }

    const difficultyLevelToVariant = (level: DifficultyLevel): "light" | "medium" | "heavy" => {
        switch (level) {
            case DifficultyLevel.EASY: return "light";
            case DifficultyLevel.ADVANCED: return "medium";
            case DifficultyLevel.CHALLENGING: return "heavy";
        }
    }

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-left md:items-center">
                <BackButton label={props.translate("backButtonLabel")} />
                <LearnBreadcrumbs
                    locale={props.locale}
                    translate={props.translate}
                    items={[{
                        title: chapterData.title,
                        path: "",
                    }]}
                />
            </div>
            <div className="flex justify-center pt-5">
                {
                    publicUrl ? <ChapterThumbnailAnimation
                        size={300}
                        source={publicUrl}
                    /> : <Skeleton className="w-full max-w-[300px] aspect-square rounded-xl"/>
                }
            </div>
            <div className="flex flex-col items-center space-y-4">
                <p className={cn("text-4xl text-center", secondary_font.className)}>{chapterData.title}</p>
                <Badge variant={difficultyLevelToVariant(chapterData.difficulty)}>
                    {difficultyLevelToLocalizedString(chapterData.difficulty)}
                </Badge>
                <p className="text-center">{chapterData.description}</p>
            </div>
            <p className={cn("text-2xl pt-5", secondary_font.className)}>
                {props.translate("learn.subheadingLessons")}
            </p>
            <LessonSelectionCarousel
                lessons={lessons}
                readTimeLabel={props.translate("learn.readtimeLabel")}
            />
        </div>
    );
}