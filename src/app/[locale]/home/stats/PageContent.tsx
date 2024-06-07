import ProgressCard from "@/components/charts/ProgressCard";

import { ValidLocale } from "@/i18n";
import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";


type PageContentProps = {
    locale: ValidLocale,
    userId: string,
    strings: {
        pageHeading: string,
        totalProgressTitle: string,
        totalProgressDescription: string,
        percentFormat: string,
    }
}

export default function PageContent(props: PageContentProps) {

    return (
        <div className="flex flex-col space-y-8">
            <p className={cn("text-4xl mx-auto font-bold text-center", secondary_font.className)}>
                {props.strings.pageHeading}
            </p>
            <ProgressCard
                progress={67}
                title={props.strings.totalProgressTitle}
                description={props.strings.totalProgressDescription}
                percentFormat={props.strings.percentFormat}
            />
        </div>
    );
}