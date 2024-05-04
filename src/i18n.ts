export const defaultLocale = "en";
export const locales = ["en", "de"] as const;
export type ValidLocale = typeof locales[number];
export const ValidLocales = new Set<ValidLocale>(locales);
export type TranslatorFunction = (key: string, params?: { [key: string]: string | number }) => string;
export type LocalizedProps = { locale: ValidLocale, translate: TranslatorFunction };

type PathnameLocale = {
    pathname: string;
    locale?: never;
};
type ISOLocale = {
    pathname?: never,
    locale: string;
};

type LocaleSource = PathnameLocale | ISOLocale;

const dictionaries: Record<ValidLocale, any> = {
    "en": () => import("./i18n/en.json").then((module) => module.default),
    "de": () => import("./i18n/de.json").then((module) => module.default),
} as const;

export const getTranslator = async (locale: ValidLocale) => {
    if (typeof dictionaries[locale] !== 'function') {
        console.error(`No valid dictionary loader found for locale: ${locale}`);
        return (key: string, params?: { [key: string]: string | number }) => {return ""}
    }

    const dictionary = await dictionaries[locale]();
    return (key: string, params?: { [key: string]: string | number }) => {
        let translation = key
            .split(".")
            .reduce((obj, key) => obj && obj[key], dictionary);
        if (!translation) {
            return key;
        }
        if (params && Object.entries(params).length) {
            Object.entries(params).forEach(([key, value]) => {
                translation = translation!.replace(`{{ ${key} }}`, String(value));
            });
        }
        return translation;
    };
};

export const getLocalePartsFrom = ({ pathname, locale }: LocaleSource) => {
    if (locale) {
        const localeLower = locale.toLowerCase();
        return {
            locale: localeLower,
        };
    } else {
        const pathnameParts = pathname!.toLowerCase().split("/");
        return {
            locale: pathnameParts[1],
        };
    }
};