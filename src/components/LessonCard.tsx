import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./shadcn-ui/card";
import LessonSelectButton from "./LessonSelectButton";

import { TranslatorFunction } from "@/i18n";

type LessonCardProps = {
    lessonId: string,
    index: number,
    title: string,
    readTime: number,
    translate: TranslatorFunction,
}

export default function LessonCard(props: LessonCardProps) {
    return (
        <Card className="aspect-square">
            <CardHeader>
                <CardTitle className="text-primary">{props.index}</CardTitle>
                <CardDescription>
                    {props.translate("learn.readtimeLabel", { readTime: props.readTime })}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-start">
                    <p className="text-lg hyphens-auto">{props.title}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <LessonSelectButton
                    lessonId={props.lessonId}
                />
            </CardFooter>
        </Card>
    );
}