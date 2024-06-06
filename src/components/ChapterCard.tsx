import { createClient } from "@/lib/supabase/server"

import { Progress } from "./shadcn-ui/progress"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/shadcn-ui/card"
import { Trophy } from "lucide-react"
import ChapterIconAnimation from "./ChapterIconAnimation"
import ChapterSelectButton from "./ChapterSelectButton"

import { DifficultyLevel } from "@/lib/types"
import { TranslatorFunction } from "@/i18n"
import { cn } from "@/lib/utils"


type ChapterCardProps = {
    chapterId: string,
    title: string,
    description: string,
    difficulty: DifficultyLevel,
    iconPath: string | null,
    progress: number,
    translate: TranslatorFunction
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

export default function ChapterCard(props: ChapterCardProps) {
    const supabase = createClient();
    const { bucket, resourcePath } = splitToBucketAndPath(props.iconPath ?? "");
    let publicUrl: string | null = null;
    if (props.iconPath && resourcePath) {
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

    const difficultyLevelToClassName = (level: DifficultyLevel): string => {
        switch (level) {
            case DifficultyLevel.EASY: return " bg-emerald-600 hover:bg-emerald-600/80";
            case DifficultyLevel.ADVANCED: return "bg-amber-600 hover:bg-amber-600/80";
            case DifficultyLevel.CHALLENGING: return "bg-rose-600 hover:bg-rose-600/80";
        }
    }

    console.log(`Chapter ${props.chapterId} with total progress ${props.progress}/100`);

    return (
        <Card className="max-w-[500px] flex flex-col h-full">
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow justify-center">
                <div className="flex flex-col items-start">
                    <div className={cn("inline-flex items-center rounded-full border-transparent text-primary-foreground text-xs px-2.5 py-0.5", difficultyLevelToClassName(props.difficulty))}>
                        <p>{difficultyLevelToLocalizedString(props.difficulty)}</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 items-center mt-6">
                        {publicUrl ? (
                            <div className="w-[100px] h-[100px] flex-shrink-0 p-2 rounded-lg bg-muted dark:bg-popover">
                                <ChapterIconAnimation size={100} source={publicUrl} />
                            </div>
                        ) : (
                            <div className="w-[100px] h-[100px] flex-shrink-0 border border-border rounded-lg"></div>
                        )}
                        <p className="text-muted-foreground">{props.description}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="mt-auto">
                <div className="w-full flex gap-4 items-center justify-stretch">
                    <Trophy className="h-[1.5rem] w-[1.5rem] flex-shrink-0 color-primary" />
                    <Progress className="w-full" value={props.progress} />
                    <ChapterSelectButton chapterId={props.chapterId} />
                </div>
            </CardFooter>
        </Card>
    );
    
    
    
}