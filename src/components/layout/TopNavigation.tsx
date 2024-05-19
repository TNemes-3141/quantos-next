import { Separator } from "../shadcn-ui/separator";

import SearchBar, { SearchBarStrings } from "../SearchBar";
import ProfilePanel from "../ProfilePanel";
import LanguageSelector from "../LanugageSelector";
import ThemeSelector from "../ThemeSelector";
import { LocalizedProps } from "@/i18n";


type TopNavigationProps = LocalizedProps & {
    withButtons: boolean,
}

export default function TopNavigation({ locale, translate, withButtons }: TopNavigationProps) {
    const searchBarStrings: SearchBarStrings = {
        searchPlaceholder: translate("home.topNavigation.searchPlaceholder"),
        noResultsMessage: translate("home.topNavigation.noResultsMessage"),
        commandHeaderNavigation: translate("home.topNavigation.commandHeaderNavigation"),
        commandHeaderShortcuts: translate("home.topNavigation.commandHeaderShortcuts"),
        commandHeaderLections: translate("home.topNavigation.commandHeaderLections"),
        commands: {
            personalSettings: translate("home.topNavigation.commands.personalSettings"),
            password: translate("home.topNavigation.commands.password"),
            accessCodes: translate("home.topNavigation.commands.accessCodes"),
            lowVision: translate("home.topNavigation.commands.lowVision"),
            colorBlindness: translate("home.topNavigation.commands.colorBlindness"),
            help: translate("home.topNavigation.commands.help"),
            info: translate("home.topNavigation.commands.info"),
        },
        tabLearn: translate("home.tabLearn"),
        tabCode: translate("home.tabCode"),
        tabStatistics: translate("home.tabStatistics"),
        tabSettings: translate("home.tabSettings"),
    };

    return (
        <>
            <div className="px-6 flex items-center justify-between h-16 w-full gap-6">
                <div className="max-w-xl w-full">
                    <SearchBar strings={searchBarStrings}/>
                </div>
                {withButtons ? <div className="flex gap-4 h-full items-center">
                    <Separator orientation="vertical" />
                    <ThemeSelector
                        dark={translate("themeSelection.dark")}
                        light={translate("themeSelection.light")}
                        system={translate("themeSelection.system")}
                        tooltip={translate("themeSelection.tooltip")}
                    />
                    <LanguageSelector />
                    <ProfilePanel
                        tooltip={translate("profilePanel.tooltip")}
                        personalSettings={translate("profilePanel.personalSettings")}
                        helpCenter={translate("profilePanel.helpCenter")}
                        logOut={translate("auth.logOutButtonLabel")}
                    />
                </div> : <></>}
            </div>
            <Separator />
        </>
    );
}