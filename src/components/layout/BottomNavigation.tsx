import NavigationLinks from "../NavigationLinks";

import { LocalizedProps } from "@/i18n";


export default function BottomNavigation(props: LocalizedProps) {
    return (
        <div className="w-full bg-background fixed inset-x-0 bottom-0 h-24 md:hidden border-t-[1.5px] border-border py-4">
            <NavigationLinks
                orientation="horizontal"
                tabLearn={props.translate("home.tabLearn")}
                tabCode={props.translate("home.tabCode")}
                tabStatistics={props.translate("home.tabStatistics")}
                tabSettings={props.translate("home.tabSettings")}
            />
        </div>
    );
}