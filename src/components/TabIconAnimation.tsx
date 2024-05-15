"use client";

import { useRive } from '@rive-app/react-canvas';

type TabIconAnimationProps = {
    size: number,
    source: string,
    stateMachine: string,
}

export default function TabIconAnimation(props: TabIconAnimationProps) {
    const { RiveComponent } = useRive({
        src: props.source,
        stateMachines: props.stateMachine,
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
        shouldResizeCanvasToContainer: true,
    });

    return (
        <RiveComponent style={{maxWidth: `${props.size}px` }} />
    );
}