"use client";

import { forwardRef, useImperativeHandle } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

type ExperienceSelectionAnimationProps = {
    size: number,
}

export interface ExperienceSelectionAnimationRef {
    setExperienceLevel: (value: 0 | 1 | 2) => void;
}

const ExperienceSelectionAnimation = forwardRef((props: ExperienceSelectionAnimationProps, ref) => {
    const { RiveComponent, rive } = useRive({
        src: "/assets/experience_selection.riv",
        stateMachines: "ExperienceClasses",
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
    });

    const experienceClass = useStateMachineInput(rive, "ExperienceClasses", "experience_class");

    useImperativeHandle(ref, () => ({
        setExperienceLevel: (value: 0 | 1 | 2) => {
            if (experienceClass) {
                experienceClass.value = value;
            }
        }
    }));

    return (
        <RiveComponent style={{ maxWidth: `${props.size}px` }}/>
    );
});

ExperienceSelectionAnimation.displayName = "ExperienceSelectionAnimation";

export default ExperienceSelectionAnimation;