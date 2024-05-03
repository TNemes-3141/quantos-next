import { NextRequest, NextResponse } from "next/server";
import langParser from "accept-language-parser";

import { defaultLocale, locales, getLocalePartsFrom } from "./i18n";

const findBestMatchingLocale = (acceptLangHeader: string) => {
    // parse the locales acceptable in the header, and sort them by priority (q)
    const parsedLangs = langParser.parse(acceptLangHeader);

    // find the first locale that matches a locale in our list
    for (let i = 0; i < parsedLangs.length; i++) {
        const parsedLang = parsedLangs[i];

        // if we didn't find a match for both language and country, try just the language
        const matchedLanguage = locales.find((locale) => {
            const localeParts = getLocalePartsFrom({ locale });
            return parsedLang.code === localeParts.locale;
        });
        if (matchedLanguage) {
            return matchedLanguage;
        }
    }
    // if we didn't find a match, return the default locale
    return defaultLocale;
};

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const defaultLocaleParts = getLocalePartsFrom({ locale: defaultLocale });

    const pathnameIsMissingValidLocale = locales.every((locale) => {
        const localeParts = getLocalePartsFrom({ locale });
        return !pathname.startsWith(`/${localeParts.locale}`);
    });

    if (pathnameIsMissingValidLocale) {
        // rewrite it so next.js will render `/` as if it was `/en/us` 
        const matchedLocale = findBestMatchingLocale(
            request.headers.get("Accept-Language") || defaultLocale
        );

        if (matchedLocale !== defaultLocale) {
            const matchedLocaleParts = getLocalePartsFrom({ locale: matchedLocale });
            return NextResponse.redirect(
                new URL(
                    `/${matchedLocaleParts.locale}${pathname}`,
                    request.url
                )
            );
        } else {
            return NextResponse.rewrite(
                new URL(
                    `/${defaultLocaleParts.locale}${pathname}`,
                    request.url
                )
            );
        }
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)",],
};