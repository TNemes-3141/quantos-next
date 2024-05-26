import BackButton from "@/components/BackButton";
import LearnBreadcrumbs from "@/components/LearnBreadcrumbs";

import { LocalizedProps } from "@/i18n";
import { getLessonContentElements } from "./getLessonContents";

type PageContentProps = LocalizedProps & {
    chapterId: string,
    lessonId: string,
}

export default async function PageContent({locale, translate, chapterId, lessonId}: PageContentProps) {
    const lessonElements = getLessonContentElements(locale, chapterId, lessonId);

    console.log((await lessonElements).pageContents[0]);

    return (
        <div className="flex flex-col space-y-6">
            <p>This is lesson {lessonId}</p>
        </div>
    );
}