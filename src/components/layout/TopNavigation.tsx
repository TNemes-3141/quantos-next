import { Separator } from "../shadcn-ui/separator";

import SearchBar from "../SearchBar";
import ProfilePanel from "../ProfilePanel";
import LanguageSelector from "../LanugageSelector";
import ThemeSelector from "../ThemeSelector";
import { LocalizedProps } from "@/i18n";

export default function TopNavigation({ locale, translate }: LocalizedProps) {
    return (
        <>
            <div className="px-6 flex items-center justify-between h-16 w-full gap-6">
                <div className="max-w-xl w-full">
                    <SearchBar />
                </div>
                <div className="flex gap-4 h-full items-center">
                    <Separator orientation="vertical" />
                    <ThemeSelector />
                    <LanguageSelector />
                    <ProfilePanel />

                </div>

            </div>
            <Separator />
        </>
    );
}