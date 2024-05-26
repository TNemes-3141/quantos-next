import BackButton from "@/components/BackButton";
import LearnBreadcrumbs from "@/components/LearnBreadcrumbs";

import { LocalizedProps } from "@/i18n";
import { getLessonContentElements, getBreadcrumbData } from "./getLessonContents";

type PageContentProps = LocalizedProps & {
    chapterId: string,
    lessonId: string,
}

export default async function PageContent({ locale, translate, chapterId, lessonId }: PageContentProps) {
    const breadcrumbData = await getBreadcrumbData(chapterId, lessonId);

    return (
        <div className="flex flex-col flex-1 overflow-y-auto p-12 sm:p-20 space-y-6">
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
            <div className="flex justify-center pt-5">

            </div>
        </div>
    );
}