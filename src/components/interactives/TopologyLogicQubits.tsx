"use client";

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

import { InteractiveElementProps } from '@/lib/types';


export default function TopologyLogicQubits(props: InteractiveElementProps) {
    const { RiveComponent, rive } = useRive({
        src: props.source,
        artboard: "Exercise",
        stateMachines: "ExerciseStates",
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
        shouldResizeCanvasToContainer: true,
    });

    const reset = useStateMachineInput(rive, "ExerciseStates", "reset");

    return (
        <>
            <RiveComponent style={{ maxWidth: `${props.size}px` }} />
        </>
    );
}