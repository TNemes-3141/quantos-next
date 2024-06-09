"use state";

import { useState } from "react";

import { Card, CardContent } from "../shadcn-ui/card";
import { Button } from "../shadcn-ui/button";
import { Check, Loader2 } from "lucide-react";
import FeedbackButtons from "./FeedbackButtons";


type LessonFinishPanelProps = {
    finishLessonText: string,
    finishButtonLabel: string,
    ratingQuestion: string,
    onFinish: () => Promise<void>,
}

export default function LessonFinishPanel(props: LessonFinishPanelProps) {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        await props.onFinish();
    };

    return (
        <Card className="w-full max-w-[400px]">
            <CardContent>
                <div className="flex flex-col items-center mt-5">
                    <p>{props.finishLessonText}</p>
                    <Button className="my-5" onClick={handleClick} disabled={loading}>
                        {props.finishButtonLabel}
                        {loading ? <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                            : <Check className="ml-2 h-4 w-4" />
                        }
                    </Button>
                    <p className="text-muted-foreground">{props.ratingQuestion}</p>
                    <FeedbackButtons size={150}/>
                </div>
            </CardContent>
        </Card>
    );
}