import Image from "next/image";

import NavigationLinks from "../NavigationLinks";
import { LocalizedProps } from "@/i18n";

export default function SideNavigation(props: LocalizedProps) {
    return (
        <div className="h-full hidden md:block md:border-r-[1.5px] md:border-border lg:w-64 md:w-24">
            <div className="px-5 pt-5 pb-10">
                <Image
                    src="/assets/quantos_logo.svg"
                    alt="Quantos Logo"
                    width={200}
                    height={40}
                />
            </div>
            <NavigationLinks
                tabLearn={props.translate("home.tabLearn")}
                tabCode={props.translate("home.tabCode")}
                tabStatistics={props.translate("home.tabStatistics")}
                tabSettings={props.translate("home.tabSettings")}
            />
        </div>
    );
}