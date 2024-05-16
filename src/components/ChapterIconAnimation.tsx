"use client";

import { useRive } from '@rive-app/react-canvas';

type ChapterIconAnimationProps = {
    size: number,
    source: string,
}

export default function ChapterIconAnimation(props: ChapterIconAnimationProps) {
    const { RiveComponent } = useRive({
        src: props.source,
        stateMachines: "Automatic",
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
        shouldResizeCanvasToContainer: true,
    });

    return (
        <RiveComponent style={{maxWidth: `${props.size}px` }} />
    );
}