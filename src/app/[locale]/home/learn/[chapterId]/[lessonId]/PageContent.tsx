import BackButton from "@/components/BackButton";
import LearnBreadcrumbs from "@/components/LearnBreadcrumbs";
import LessonContentDisplay from "@/components/lessons/LessonContentDisplay";

import { LocalizedProps } from "@/i18n";
import { getLessonContentElements, getBreadcrumbData } from "./actions";

type PageContentProps = LocalizedProps & {
    userId: string,
    chapterId: string,
    lessonId: string,
}

export default async function PageContent({ locale, translate, userId, chapterId, lessonId }: PageContentProps) {
    const breadcrumbData = await getBreadcrumbData(chapterId, lessonId);
    const lessonContent = await getLessonContentElements(locale, chapterId, lessonId);

    return (
        <div className="flex flex-col flex-1 p-6 sm:p-20 space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-left md:items-center">
                <BackButton label={translate("backButtonLabel")} />
                <LearnBreadcrumbs
                    locale={locale}
                    translate={translate}
                    items={[{
                        title: breadcrumbData.chapterTitle,
                        path: chapterId,
                    },
                    {
                        title: breadcrumbData.lessonTitle,
                        path: "",
                    }]}
                />
            </div>
            <LessonContentDisplay
                title={breadcrumbData.lessonTitle}
                id={lessonId}
                user={userId}
                content={lessonContent}
                strings={{
                    outlineTooltip: translate("learn.navigationBar.outlineTooltip"),
                    outlineDescription: translate("learn.navigationBar.outlineDescription"),
                    nextPageTooltip: translate("learn.navigationBar.nextPageTooltip"),
                    previousPageTooltip: translate("learn.navigationBar.previousPageTooltip"),
                    closeButtonLabel: translate("closeButtonLabel"),
                    finishLessonText: translate("learn.finishPanel.finishLessonText"),
                    ratingQuestion: translate("learn.finishPanel.ratingQuestion"),
                    finishButtonLabel: translate("learn.finishPanel.finishButtonLabel"),
                }}
            />
        </div>
    );
}