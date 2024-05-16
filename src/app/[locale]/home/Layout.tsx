import TopNavigation from "@/components/layout/TopNavigation";
import SideNavigation from "@/components/layout/SideNavigation";
import BottomNavigation from "@/components/layout/BottomNavigation";
import PageContent from "./PageContent";

import { LocalizedProps } from "@/i18n";


type LayoutProps = LocalizedProps & {
    userName: string | null | undefined,
}

export default function Layout({ locale, translate, userName }: LayoutProps) {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideNavigation locale={locale} translate={translate}/>
            <div className="flex flex-col flex-1">
                <TopNavigation locale={locale} translate={translate} />
                <main className="flex-1 overflow-y-auto p-12 sm:p-20">
                    <PageContent locale={locale} translate={translate} userName={userName}/>
                </main>
                <BottomNavigation locale={locale} translate={translate}/>
            </div>
        </div>
    );
}