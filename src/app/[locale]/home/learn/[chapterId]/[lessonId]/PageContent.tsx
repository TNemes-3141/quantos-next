import BackButton from "@/components/BackButton";
import LearnBreadcrumbs from "@/components/LearnBreadcrumbs";
import LessonContentNavigator from "@/components/lessons/LessonContentNavigator";

import { LocalizedProps } from "@/i18n";
import { getLessonContentElements, getBreadcrumbData } from "./getLessonContents";

type PageContentProps = LocalizedProps & {
    chapterId: string,
    lessonId: string,
}

export default async function PageContent({ locale, translate, chapterId, lessonId }: PageContentProps) {
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
            <LessonContentNavigator
                title={breadcrumbData.lessonTitle}
                content={lessonContent}
                strings={{
                    outlineTooltip: translate("learn.navigationBar.outlineTooltip"),
                    outlineDescription: translate("learn.navigationBar.outlineDescription"),
                    nextPageTooltip: translate("learn.navigationBar.nextPageTooltip"),
                    previousPageTooltip: translate("learn.navigationBar.previousPageTooltip"),
                    closeButtonLabel: translate("closeButtonLabel"),
                }}
            />
        </div>
    );
}