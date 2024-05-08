import Link from "next/link";
import { ValidLocale, getTranslator } from "@/i18n";

import { cn } from "@/lib/utils";
import { secondary_font } from "@/lib/fonts";

export default async function Home({
    params,
}: {
    params: { locale: string; };
}) {
    const validLocale = params.locale as ValidLocale
    const translate = await getTranslator(validLocale);

    return (
        <main className="flex flex-col items-center justify-center p-12 sm:p-24 w-full space-y-12 text-center">
            <div className="text-destructive flex flex-col space-y-6">
                <h1 className={cn("text-5xl font-bold", secondary_font.className)}>404</h1>
                <p>{translate("error.pageText")}</p>
            </div>
            <Link href="/" className="underline">{translate("error.pageCta")}</Link>
        </main>
    );
}