"use client";

import { forwardRef, useImperativeHandle } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

type PasswordAnimationProps = {
    size: number,
}

export interface PasswordAnimationRef {
    firePasswordTyping: () => void;
    fireFormValid: () => void;
    fireFormInvalid: () => void;
}

const PasswordAnimation = forwardRef((props: PasswordAnimationProps, ref) => {
    const { RiveComponent, rive } = useRive({
        src: "/assets/password_assistant.riv",
        stateMachines: "PasswordStates",
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
    });

    const passwordTyping = useStateMachineInput(rive, "PasswordStates", "passwordTyping");
    const formValid = useStateMachineInput(rive, "PasswordStates", "formValid");
    const formInvalid = useStateMachineInput(rive, "PasswordStates", "formInvalid");

    useImperativeHandle(ref, () => ({
        firePasswordTyping: () => {
            passwordTyping?.fire();
        },
        fireFormValid: () => {
            formValid?.fire();
        },
        fireFormInvalid: () => {
            formInvalid?.fire();
        }
    }));

    return (
        <RiveComponent style={{ maxWidth: `${props.size}px` }}/>
    );
});

PasswordAnimation.displayName = "PasswordAnimation";

export default PasswordAnimation;