"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

import TabIconAnimation from "./TabIconAnimation";

type NavigationLinksProps = {
    tabLearn: string,
    tabCode: string,
    tabStatistics: string,
    tabSettings: string,
}

type NavigationLink = {
    name: string,
    href: string,
    iconSource: string,
    iconStateMachine: string,
}

const getPathnameWithoutLocale = (path: string): string => {
    const secondSlashIndex = path.indexOf('/', path.indexOf('/') + 1);
    if (secondSlashIndex === -1) return path;
    return path.substring(secondSlashIndex);
}

export default function NavigationLinks(props: NavigationLinksProps) {
    const pathName = getPathnameWithoutLocale(usePathname());
    const links: NavigationLink[] = [
        {
            name: props.tabLearn,
            href: "/home",
            iconSource: "/assets/icons/tab_home.riv",
            iconStateMachine: "HoverStates",
        },
        {
            name: props.tabCode,
            href: "/home/code",
            iconSource: "/assets/icons/tab_code.riv",
            iconStateMachine: "HoverStates",
        },
        {
            name: props.tabStatistics,
            href: "/home/stats",
            iconSource: "/assets/icons/tab_statistics.riv",
            iconStateMachine: "HoverStates",
        },
        {
            name: props.tabSettings,
            href: "/home/settings",
            iconSource: "/assets/icons/tab_settings.riv",
            iconStateMachine: "HoverStates",
        },
    ];

    return (
        <div className="flex flex-col gap-4">
            {links.map((link) => (
                <Link key={link.name} href={link.href}>
                    <div className={cn("flex gap-4 justify-center lg:justify-start items-center px-4 py-2 mx-4 rounded-md cursor-pointer",
                        pathName === link.href ? "bg-muted" : "hover:bg-card bg-transparent")}>
                        <TabIconAnimation
                            size={40}
                            source={link.iconSource}
                            stateMachine={link.iconStateMachine}
                        />
                        <p className="uppercase hidden lg:block">{link.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}