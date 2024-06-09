"use client";

import { useRive } from '@rive-app/react-canvas';

type ChapterThumbnailAnimationProps = {
    size: number,
    source: string,
}

export default function ChapterThumbnailAnimation(props: ChapterThumbnailAnimationProps) {
    const { RiveComponent } = useRive({
        src: props.source,
        stateMachines: "Loop",
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
        shouldResizeCanvasToContainer: true,
    });

    return (
        <RiveComponent style={{maxWidth: `${props.size}px` }} />
    );
}