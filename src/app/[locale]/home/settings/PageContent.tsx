import { cn } from "@/lib/utils"
import { secondary_font } from "@/lib/fonts"
import { LocalizedProps } from "@/i18n"

import { getTeamName } from "./actions";


type PageContentProps = LocalizedProps & {
    userId: string,
}

export default async function PageContent(props: PageContentProps) {
    const teamName = await getTeamName(props.userId);

    return (
        <div className="flex flex-col space-y-10 items-center">
            <p className={cn("text-4xl mx-auto font-bold text-center", secondary_font.className)}>
                {props.translate("settings.heading")}
            </p>
            {teamName.length > 0 ? <p className="text-muted-foreground">
                {props.translate("settings.team", { team: teamName })}
            </p> : null}
        </div>
    );
}