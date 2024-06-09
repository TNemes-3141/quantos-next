"use client";

import { useState, useEffect } from 'react';
import { useRive, useStateMachineInput, EventType, RiveEventPayload, EventCallback } from '@rive-app/react-canvas';
import { RotateCcw } from 'lucide-react';

import { Button } from '../shadcn-ui/button';
import { InteractiveElementProps } from '@/lib/types';
import { ValidLocale } from '@/i18n';
import { cn } from '@/lib/utils';


function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAssignmentText(locale: ValidLocale, num: number): string {
    switch (locale) {
        case "en":
            return num > 1 ? `At least ${num} couplings` : `At least 1 coupling`;
        case "de":
            return num > 1 ? `Mindestens ${num} Kopplungen` : `Mindestens 1 Kopplung`;
    }
}

function getEvaluateButtonText(locale: ValidLocale) {
    switch (locale) {
        case "en":
            return "Check";
        case "de":
            return "Überprüfen";
        default:
            break;
    }
}

function getResetButtonText(locale: ValidLocale) {
    switch (locale) {
        case "en":
            return "Get new exercise";
        case "de":
            return "Neue Aufgabe";
        default:
            break;
    }
}

export default function TopologyLogicQubits(props: InteractiveElementProps) {
    const [minCouplers, setMinCouplers] = useState<number>(getRandomInt(1, 16));
    let interactionStarted = false;

    const [activeCouplers, setActiveCouplers] = useState<number>(0);
    const [activeQubits, setActiveQubits] = useState<number>(0);
    //let activeCouplers = 0;
    //let activeQubits = 0;

    const { RiveComponent, rive } = useRive({
        src: props.source,
        artboard: "Exercise",
        stateMachines: "ExerciseStates",
        autoplay: true,
    }, {
        fitCanvasToArtboardHeight: true,
        shouldResizeCanvasToContainer: true,
    });

    const onRiveEventReceived: EventCallback = (riveEvent) => {
        const eventData = riveEvent.data;
        if (eventData && typeof eventData === 'object' && "name" in eventData) {
            const eventName = eventData.name;
            if (eventName === "InteractionStarted") {
                interactionStarted = true;
            }
            if (eventName === "CouplerActivated" && interactionStarted) {
                setActiveCouplers((prev) => prev + 1);
                console.log(activeCouplers);
            }
            if (eventName === "CouplerDectivated" && interactionStarted) {
                setActiveCouplers((prev) => prev - 1);
            }
            if (eventName === "QubitActivated" && interactionStarted) {
                setActiveQubits((prev) => prev + 1);
            }
            if (eventName === "QubitDectivated" && interactionStarted) {
                setActiveQubits((prev) => prev - 1);
            }
        }
    }

    useEffect(() => {
        if (rive) {
          rive.on(EventType.RiveEvent, onRiveEventReceived);
        }
      }, [rive]);

    const reset = useStateMachineInput(rive, "ExerciseStates", "reset");
    const feedback = useStateMachineInput(rive, "ExerciseStates", "feedback");

    const initializeExercise = () => {
        setMinCouplers(getRandomInt(1, 16));
    }

    const evaluateExercise = () => {
        interactionStarted = false;
        if (!feedback) {
            return;
        }

        if (minCouplers <= 6) {
            console.log(`Active qubits: ${activeQubits}`)
            if (activeQubits >= 1) {
                feedback.value = 1;
            } else {
                feedback.value = 2;
            }
        } else if (minCouplers > 6 && minCouplers <= 10) {
            console.log(`Active couplers: ${activeCouplers}`)
            if (activeCouplers >= 1) {
                feedback.value = 1;
            } else {
                feedback.value = 2;
            }
        } else {
            console.log(`Active couplers: ${activeCouplers}`)
            if (activeCouplers >= 2) {
                feedback.value = 1;
            } else {
                feedback.value = 2;
            }
        }
    }

    const resetExercise = () => {
        if (feedback) {
            feedback.value = 0;
        }
        if (reset) {
            reset.fire();
        }
        setActiveCouplers(0);
        setActiveQubits(0);
        initializeExercise();
    }

    return (
        <div className='flex flex-col gap-4 items-center w-full mb-4'>
            <p className='text-xl'>{getAssignmentText(props.locale, minCouplers)}</p>
            <RiveComponent style={{ maxWidth: `${props.size}px` }} />
            <div className={cn("flex justify-evenly w-full", `max-w-[${props.size}px]`)}>
                <Button variant="default" onClick={evaluateExercise}>{getEvaluateButtonText(props.locale)}</Button>
                <Button variant="secondary" size="icon" aria-label={getResetButtonText(props.locale)} onClick={resetExercise}>
                    <RotateCcw className="h-[1.2rem] w-[1.2rem]"/>
                    <span className="sr-only">{getResetButtonText(props.locale)}</span>
                </Button>
            </div>
        </div>
    );
}