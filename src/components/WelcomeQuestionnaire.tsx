"use client";

import { createElement, useState, useEffect } from "react";
import { WelcomeLocalizedStrings } from "@/lib/types"

import { QuestionComponentType } from "@/app/[locale]/welcome/questionComponents";
import { WelcomePage } from "./welcome-questions/WelcomePage";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "./shadcn-ui/button";

type WelcomeQuestionnaireProps = {
    strings: WelcomeLocalizedStrings,
    setProgress: any,
}

const questionComponents: QuestionComponentType[] = [WelcomePage, WelcomePage, WelcomePage];

export default function WelcomeQuestionnaire(props: WelcomeQuestionnaireProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [animationState, setAnimationState] = useState<"enter" | "exit">("enter");
    const totalQuestions = 6;

    useEffect(() => {
        setAnimationState("enter");
    }, [currentQuestion]);

    const goToNextQuestion = () => {
        if (currentQuestion < totalQuestions - 1) {
            setAnimationState('exit');
            setTimeout(() => {
                const nextQuestion = currentQuestion + 1;
                setCurrentQuestion(nextQuestion);
                props.setProgress(nextQuestion + 1);
            }, 300); // Match timeout to animation duration
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestion > 0) {
            setAnimationState('exit');
            setTimeout(() => {
                const prevQuestion = currentQuestion - 1;
                setCurrentQuestion(prevQuestion);
                props.setProgress(prevQuestion + 1);
            }, 300); // Match timeout to animation duration
        }
    };

    const QuestionComponent = questionComponents[currentQuestion];

    return (
        <div className="max-w-[700px] w-full">
            <div className={animationState === 'enter' ? 'animate-fade-slide-in' : 'animate-fade-slide-out'}>
                {createElement(QuestionComponent, {
                    data: props.strings,
                    onChange: (answer: any) => console.log(answer)
                })}
            </div>
            <div className="flex justify-between mt-4">
                {currentQuestion > 0 ?
                    <Button variant="ghost" onClick={goToPreviousQuestion} className="px-4 py-2">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button> :
                    <div></div>
                }
                {currentQuestion === totalQuestions - 1 ?
                    <Button variant="default" className="px-4 py-2">Finish</Button> :
                    <Button variant="ghost" onClick={goToNextQuestion} className="px-4 py-2">
                        Next
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                }
            </div>
        </div>
    );
}