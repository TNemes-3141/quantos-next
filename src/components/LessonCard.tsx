import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./shadcn-ui/card";
import { Progress } from "./shadcn-ui/progress";
import LessonSelectButton from "./LessonSelectButton";


type LessonCardProps = {
    lessonId: string,
    index: number,
    title: string,
    readTimeLabel: string,
    progressValue: number,
    isSquare: boolean,
}

export default function LessonCard(props: LessonCardProps) {
    return (
        <Card className={`flex flex-col justify-between ${props.isSquare ? "aspect-square" : ""} h-full`}>
            <div>
                <CardHeader>
                    <CardTitle className="text-primary">{props.index}</CardTitle>
                    <CardDescription>
                        {props.readTimeLabel}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-start">
                        <p className="text-lg hyphens-auto">{props.title}</p>
                    </div>
                </CardContent>
            </div>
            <CardFooter className="mt-auto flex justify-end">
                <div className="w-full flex gap-4 items-center justify-stretch">
                    <Progress className="w-full" value={props.progressValue} />
                    <LessonSelectButton
                        lessonId={props.lessonId}
                    />
                </div>
            </CardFooter>
        </Card>
    );
}