"use client";

import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useTheme } from 'next-themes';
import { ValidLocale } from '@/i18n';


type InteractiveAnimationProps = {
    source: string,
    locale: ValidLocale,
    size: number,
}

function getLanguageInputForLocale(locale: ValidLocale): number {
    switch (locale) {
        case 'en': return 0;
        case 'de': return 1;
    }
}

export default function InteractiveAnimation(props: InteractiveAnimationProps) {
    const { RiveComponent, rive } = useRive({
        src: props.source,
        stateMachines: "ExerciseStates",
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
        shouldResizeCanvasToContainer: true,
    });
    const { theme } = useTheme();

    const language = useStateMachineInput(rive, "ExerciseStates", "language");
    if (language) {
        language.value = getLanguageInputForLocale(props.locale);
    }
    const dark = useStateMachineInput(rive, "ExerciseStates", "dark");
    if (dark) {
        dark.value = theme === "dark";
    }

    return (
        <>
           <RiveComponent style={{ maxWidth: `${props.size}px` }} />
        </>
    );
}