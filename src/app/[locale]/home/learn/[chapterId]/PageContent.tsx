import LessonSelectionCarousel from "@/components/LessonSelectionCarousel";
import { Separator } from "@/components/shadcn-ui/separator";

import { LocalizedProps } from "@/i18n";
import { cn } from "@/lib/utils";
import { secondary_font } from "@/lib/fonts";
import { getLessonCardData } from "./getLessons";


type PageContentProps = LocalizedProps & {
    chapterId: string,
}

export default async function PageContent(props: PageContentProps) {
    const lessons = await getLessonCardData(props.chapterId);

    return (
        <div className="flex flex-col space-y-6">
            <p className={cn("text-2xl mt-5", secondary_font.className)}>
                {props.translate("learn.subheadingLessons")}
            </p>
            <Separator/>
            <LessonSelectionCarousel
                lessons={lessons}
                readTimeLabel={props.translate("readTimeLabel")}
            />
        </div>
    );
}