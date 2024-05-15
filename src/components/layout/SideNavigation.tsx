import Image from "next/image";

import NavigationLinks from "../NavigationLinks";
import { LocalizedProps } from "@/i18n";

export default function SideNavigation(props: LocalizedProps) {
    return (
        <div className="h-full hidden md:block md:border-r-[1.5px] md:border-border lg:w-64 md:w-24">
            <div className="flex justify-center px-5 pt-5 pb-10">
                <div className="hidden lg:block">
                    <Image
                        className="hidden dark:block"
                        src="/assets/quantos_logo_onDark.svg"
                        alt="Quantos Logo"
                        width={200}
                        height={40}
                    />
                    <Image
                        className="block dark:hidden"
                        src="/assets/quantos_logo_onLight.svg"
                        alt="Quantos Logo"
                        width={200}
                        height={40}
                    />
                </div>
                <div className="lg:hidden">
                    <Image
                        src="/assets/quantos_icon.svg"
                        alt="Quantos Logo"
                        width={40}
                        height={40}
                    />
                </div>
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