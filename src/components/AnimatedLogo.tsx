"use client";

import { useRive } from '@rive-app/react-canvas';

type AnimatedLogoProps = {
    size: number
}

export default function AnimatedLogo(props: AnimatedLogoProps) {
    const { RiveComponent } = useRive({
        src: "/assets/quantos_logo_idle.riv",
        stateMachines: "Mixer",
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
    });

    return (
        <RiveComponent style={{ maxWidth: `${props.size}px` }} />
    );
}