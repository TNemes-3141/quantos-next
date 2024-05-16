import Layout from "../../Layout";

import { ValidLocale, getTranslator } from "@/i18n";
import { validateUser } from "@/lib/validateUser";

export default async function Home({
    params,
}: {
    params: {
        locale: string,
        chapterId: string,
    };
}) {
    const user = await validateUser();
    const validLocale = params.locale as ValidLocale
    const translate = await getTranslator(validLocale);

    return (
        <Layout locale={validLocale} translate={translate} >
            <p>{params.chapterId}</p>
        </Layout>
    );
}