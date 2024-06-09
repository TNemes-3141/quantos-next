import PageContent from "./PageContent";

import { ValidLocale, getTranslator } from "@/i18n";
import { validateUser } from "@/lib/validateUser";
import { createProgressEntryIfNotPresent } from "./actions";


export default async function Home({
    params,
}: {
    params: {
        locale: string,
        chapterId: string,
        lessonId: string,
    };
}) {
    const user = await validateUser();
    await createProgressEntryIfNotPresent(user.id, params.lessonId); 

    const validLocale = params.locale as ValidLocale
    const translate = await getTranslator(validLocale);

    return (
        <PageContent
            userId={user.id}
            chapterId={params.chapterId}
            lessonId={params.lessonId}
            locale={validLocale}
            translate={translate}
        />
    );
}