import LessonSelectionCarousel from "@/components/LessonSelectionCarousel";
import BackButton from "@/components/BackButton";
import LearnBreadcrumbs from "@/components/LearnBreadcrumbs";

import { LocalizedProps } from "@/i18n";
import { cn } from "@/lib/utils";
import { secondary_font } from "@/lib/fonts";
import { getChapterName, getLessonCardData } from "./getLessons";


type PageContentProps = LocalizedProps & {
    chapterId: string,
}

export default async function PageContent(props: PageContentProps) {
    const lessons = await getLessonCardData(props.chapterId);
    const chapterTitle = await getChapterName(props.chapterId);

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-left md:items-center">
                <BackButton label={props.translate("backButtonLabel")}/>
                <LearnBreadcrumbs
                    locale={props.locale}
                    translate={props.translate}
                    items={[{
                        title: chapterTitle,
                        path: "",
                    }]}
                />
            </div>
            <p className={cn("text-2xl mt-5", secondary_font.className)}>
                {props.translate("learn.subheadingLessons")}
            </p>
            <LessonSelectionCarousel
                lessons={lessons}
                readTimeLabel={props.translate("learn.readtimeLabel")}
            />
        </div>
    );
}