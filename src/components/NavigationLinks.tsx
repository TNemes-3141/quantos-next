"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import TabIconAnimation from "./TabIconAnimation";

import { cn } from "@/lib/utils";
import { secondary_font } from "@/lib/fonts";
import useMediaQuery from "@/lib/useMediaQuery";


type NavigationLinksProps = {
    tabLearn: string,
    tabCode: string,
    tabStatistics: string,
    tabSettings: string,
    orientation: "horizontal" | "vertical",
}

type NavigationLink = {
    name: string,
    href: string,
    iconSource: string,
    svgSource: string,
    iconStateMachine: string,
}

const getPathnameWithoutLocale = (path: string): string => {
    const secondSlashIndex = path.indexOf('/', path.indexOf('/') + 1);
    if (secondSlashIndex === -1) return path;
    return path.substring(secondSlashIndex);
}

const getLocale = (path: string): string | undefined => {
    const parts = path.split('/');
    return parts[1] || undefined;
}

export default function NavigationLinks(props: NavigationLinksProps) {
    const path = usePathname();
    const pathName = getPathnameWithoutLocale(path);
    const locale = getLocale(path);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const links: NavigationLink[] = [
        {
            name: props.tabLearn,
            href: "/home/learn",
            iconSource: "/assets/icons/tab_home.riv",
            svgSource: "/assets/icons/tab_home.svg",
            iconStateMachine: "HoverStates",
        },
        {
            name: props.tabCode,
            href: "/home/code",
            iconSource: "/assets/icons/tab_code.riv",
            svgSource: "/assets/icons/tab_code.svg",
            iconStateMachine: "HoverStates",
        },
        {
            name: props.tabStatistics,
            href: "/home/stats",
            iconSource: "/assets/icons/tab_statistics.riv",
            svgSource: "/assets/icons/tab_statistics.svg",
            iconStateMachine: "HoverStates",
        },
        {
            name: props.tabSettings,
            href: "/home/settings",
            iconSource: "/assets/icons/tab_settings.riv",
            svgSource: "/assets/icons/tab_settings.svg",
            iconStateMachine: "HoverStates",
        },
    ];

    return (
        <div className={cn("flex gap-4", props.orientation === "vertical" ? "flex-col justify-start" : " justify-around items-center")}>
            {links.map((link) => (
                <Link key={link.name} href={`${locale ? `${"/" + locale}` : ""}${link.href}`}> {/*TODO: Include locale */}
                    <div className={cn("flex gap-4 justify-center lg:justify-start items-center px-4 py-2 md:mx-4 rounded-md cursor-pointer",
                        pathName === link.href ? "bg-muted" : "hover:bg-card bg-transparent")}>
                        {isDesktop ? <TabIconAnimation
                            size={40}
                            source={link.iconSource}
                            stateMachine={link.iconStateMachine}
                        /> : <Image
                            src={link.svgSource}
                            alt="Quantos Logo"
                            width={40}
                            height={40}
                        />}
                        <p className={cn("uppercase hidden lg:block", secondary_font.className)}>{link.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}