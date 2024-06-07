import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../shadcn-ui/card";
import TotalProgressChart from "./TotalProgressChart";

import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";


type ProgressCardProps = {
    progress: number,
    title: string,
    description: string,
    percentFormat: string,
}

export default function ProgressCard(props: ProgressCardProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            <p className={cn('font-semibold text-2xl tracking-tight', secondary_font.className)}>
                {props.title}
            </p>
            <p className="text-muted-foreground">
                {props.description}
            </p>
            <div className="max-w-[250px] max-h-[250px]">
                <TotalProgressChart
                    progress={props.progress}
                    percentFormat={props.percentFormat}
                />
            </div>
        </div>
    );
}