"use client";

import { useRive } from '@rive-app/react-canvas';

type FeedbackButtonsProps = {
    size: number
}

export default function FeedbackButtons(props: FeedbackButtonsProps) {
    const { RiveComponent } = useRive({
        src: "/assets/feedback_buttons.riv",
        stateMachines: "Main",
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
    });

    return (
        <RiveComponent style={{ maxWidth: `${props.size}px` }} />
    );
}