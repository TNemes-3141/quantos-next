import TotalProgressCard from "@/components/charts/TotalProgressCard";
import StatCard from "@/components/charts/StatCard";
import PerformanceChart from "@/components/charts/PerformanceChart";
import { TriangleAlert } from "lucide-react";

import { LocalizedProps } from "@/i18n";
import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { getStats } from "./getStats";
import { ProgressMap } from "../learn/actions";


type PageContentProps = LocalizedProps & {
    userId: string,
}

function aggregateChapterProgresses(map: ProgressMap): number {
    let sumOfProgresses = 0;
    map.forEach((progress) => {
        sumOfProgresses += progress;
    });

    return sumOfProgresses / map.size;
}

export default async function PageContent({ userId, locale, translate}: PageContentProps) {
    const stats = await getStats(userId, locale);

    return (
        <div className="flex flex-col space-y-10">
            <p className={cn("text-4xl mx-auto font-bold text-center", secondary_font.className)}>
                {translate("stats.heading")}
            </p>
            <TotalProgressCard
                progress={Math.floor(aggregateChapterProgresses(stats.progressPerChapter) * 100)}
                title={translate("stats.totalProgress.title")}
                description={translate("stats.totalProgress.description")}
                percentFormat={translate("stats.percentFormat")}
            />
            <div className="flex space-x-2 justify-start items-center">
                <TriangleAlert color="#e7184c" className="h-[1.2rem] w-[1.2rem] flex-shrink-0"/>
                <p className="text-destructive">{translate("stats.activityDataNote")}</p>
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-[repeat(auto-fit,_minmax(500px,_1fr))]">
                <StatCard title={translate("stats.performance.title")} description={translate("stats.performance.description")}>
                    <PerformanceChart
                        data={stats.lessonCompleteActivity}
                        dataPointLabel={translate("stats.performance.dataPointLabel")}
                        weekdays={{
                            monday: translate("stats.weekdays.monday"),
                            tuesday: translate("stats.weekdays.tuesday"),
                            wednesday: translate("stats.weekdays.wednesday"),
                            thursday: translate("stats.weekdays.thursday"),
                            friday: translate("stats.weekdays.friday"),
                            saturday: translate("stats.weekdays.saturday"),
                            sunday: translate("stats.weekdays.sunday"),
                        }}
                    />
                </StatCard>
            </div>
        </div>
    );
}