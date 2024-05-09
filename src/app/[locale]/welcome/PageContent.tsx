"use client";

import { TranslatorFunction } from "@/i18n";

type PageContentProps = {
    translate: TranslatorFunction,
}

export default function PageContent(props: PageContentProps) {
    return (
        <main className="flex flex-col items-center justify-center p-12 sm:p-20 w-full space-y-12">
            
        </main>
    );
}