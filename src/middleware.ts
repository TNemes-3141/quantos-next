import { NextRequest, NextResponse } from "next/server";
import langParser from "accept-language-parser";

import { defaultLocale, locales, getLocalePartsFrom } from "./i18n";
import { updateSession } from "./lib/supabase/middleware";

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

export async function middleware(request: NextRequest) {
    //---AUTHENTICATION---
    let authResponse = await updateSession(request);

    //---LOCALIZATION---
    const pathname = request.nextUrl.pathname;
    const defaultLocaleParts = getLocalePartsFrom({ locale: defaultLocale });

    const pathnameIsMissingValidLocale = locales.every((locale) => {
        const localeParts = getLocalePartsFrom({ locale });
        return !pathname.startsWith(`/${localeParts.locale}`);
    });

    if (pathnameIsMissingValidLocale) {
        console.log("Missing valid locale in Middleware");
        // rewrite it so next.js will render `/` as if it was `/en/us` 
        const matchedLocale = findBestMatchingLocale(
            request.headers.get("Accept-Language") || defaultLocale
        );

        let newUrl: URL;
        let usedDefaultLocale = false;

        if (matchedLocale !== defaultLocale) {
            const matchedLocaleParts = getLocalePartsFrom({ locale: matchedLocale });
            newUrl = new URL(
                `/${matchedLocaleParts.locale}${pathname}`,
                request.url
            );
        } else {
            usedDefaultLocale = true;
            newUrl = new URL(
                `/${defaultLocaleParts.locale}${pathname}`,
                request.url
            );
        }

        let combinedResponse = usedDefaultLocale ? NextResponse.rewrite(newUrl) : NextResponse.redirect(newUrl);

        // Apply cookies and headers from the authentication middleware's response
        authResponse.headers.forEach((value, key) => combinedResponse.headers.set(key, value));
        authResponse.cookies.getAll().forEach((cookie) => combinedResponse.cookies.set(cookie));
        return combinedResponse;
    }

    console.log("Headers:");
    authResponse.headers.forEach((value, key) => console.log("Key: " + key + " / Value: " + value));
    console.log("Cookies:");
    authResponse.cookies.getAll().forEach((cookie) => console.log("Name: " + cookie.name + " / Value: " + cookie.value));

    return authResponse;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|riv)$).*)"],
};