"use client";
import { usePathname, useRouter } from "next/navigation";

import { ValidLocale, ValidLocales } from "@/i18n";

import { Button } from "./shadcn-ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./shadcn-ui/dropdown-menu"
import { Globe } from "lucide-react";


const transformPathname = (urlPath: string, locale: ValidLocale): string | undefined => {
    const parts = urlPath.split('/');

    if (parts.length > 1) {
        const potentialLocale = parts[1] as ValidLocale;
        if (ValidLocales.has(potentialLocale)) {
            if (potentialLocale === locale) {
                return undefined;
            }
            parts[1] = locale;
        } else if (parts[1] === "") {
            parts[1] = locale;
        } else {
            parts.splice(1, 0, locale);
        }
    } else {
        parts.push(locale);
    }

    return parts.join('/');
}

export default function LanguageSelector() {
    const pathname = usePathname();
    const router = useRouter();

    const redirect = (locale: ValidLocale) => {
        const newPath = transformPathname(pathname, locale);
        console.log("New path: " + newPath);
        if (!newPath) {
            return;
        }

        router.push(newPath);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Choose language">
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Choose language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => redirect("en")}>
                    English (EN)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => redirect("de")}>
                    Deutsch (DE)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}