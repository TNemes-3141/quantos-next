import { cn } from "@/lib/utils"
import { secondary_font } from "@/lib/fonts"
import { LocalizedProps } from "@/i18n"


export default function PageContent(props: LocalizedProps) {
    return (
        <div className="flex flex-col space-y-10 items-center">
            <p className={cn("text-4xl mx-auto font-bold text-center", secondary_font.className)}>
                {props.translate("settings.heading")}
            </p>
        </div>
    );
}