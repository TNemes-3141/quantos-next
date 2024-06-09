"use client";

import { forwardRef, useImperativeHandle } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

type AgeSelectionAnimationProps = {
    size: number,
}

export interface AgeSelectionAnimationRef {
    setAgeClass: (value: -1 | 0 | 1 | 2 | 3) => void;
}

export const AgeSelectionAnimation = forwardRef((props: AgeSelectionAnimationProps, ref) => {
    const { RiveComponent, rive } = useRive({
        src: "/assets/age_selection.riv",
        stateMachines: "AgeClasses",
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
    });

    const ageClass = useStateMachineInput(rive, "AgeClasses", "age_class");

    useImperativeHandle(ref, () => ({
        setAgeClass: (value: -1 | 0 | 1 | 2 | 3) => {
            if (ageClass) {
                ageClass.value = value;
            }
        }
    }));

    return (
        <RiveComponent style={{ maxWidth: `${props.size}px` }}/>
    );
});