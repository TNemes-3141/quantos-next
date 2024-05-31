import { Card, CardContent } from "../shadcn-ui/card";
import { Button } from "../shadcn-ui/button";
import { Check } from "lucide-react";


type LessonFinishPanelProps = {
    finishLessonText: string,
    finishButtonLabel: string,
    ratingQuestion: string,
}

export default function LessonFinishPanel(props: LessonFinishPanelProps) {
    return (
        <Card className="w-full max-w-[400px]">
            <CardContent>
                <div className="flex flex-col items-center mt-5">
                    <p>{props.finishLessonText}</p>
                    <Button className="my-5">
                        {props.finishButtonLabel}
                        <Check className="ml-2 h-4 w-4" />
                    </Button>
                    <p className="text-muted-foreground">{props.ratingQuestion}</p>
                </div>
            </CardContent>
        </Card>
    );
}