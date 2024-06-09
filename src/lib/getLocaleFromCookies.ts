import { cookies } from 'next/headers'; // For server-side
import { defaultLocale } from "../i18n";

export const getLocaleFromCookies = (): string => {
    const locale = cookies().get('locale')?.value;
    return locale || defaultLocale;
};
