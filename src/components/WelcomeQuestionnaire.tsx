"use client";

import { createElement, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { WelcomeLocalizedStrings } from "@/lib/types"

import { QuestionComponentType } from "@/app/[locale]/welcome/questionComponents";
import { WelcomePage } from "./welcome-questions/WelcomePage";
import { NamePage } from "./welcome-questions/NamePage";
import { AccountTypePage } from "./welcome-questions/AccountTypePage";
import { AgePage } from "./welcome-questions/AgePage";
import { ExperiencePage } from "./welcome-questions/ExperiencePage";
import { FinalPage } from "./welcome-questions/FinalPage";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "./shadcn-ui/button";
import { ValidLocale } from "@/i18n";


type WelcomeQuestionnaireProps = {
    locale: ValidLocale
    strings: WelcomeLocalizedStrings,
    setProgress: any,
}

const questionComponents: QuestionComponentType[] = [
    WelcomePage,
    NamePage,
    AccountTypePage,
    AgePage,
    ExperiencePage,
    FinalPage
];

export default function WelcomeQuestionnaire(props: WelcomeQuestionnaireProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [animationState, setAnimationState] = useState<"enter" | "exit">("enter");
    const [loading, setLoading] = useState(false);
    const submitRef = useRef<HTMLButtonElement>(null);
    const totalQuestions = 6;

    useEffect(() => {
        setAnimationState("enter");
    }, [currentQuestion]);

    const goToNextQuestion = async () => {
        if (currentQuestion < totalQuestions - 1) {
            if (submitRef.current) {
                submitRef.current.click();
            } // Notify question components to submit
            setAnimationState('exit');
            setTimeout(() => {
                const nextQuestion = currentQuestion + 1;
                setCurrentQuestion(nextQuestion);
                props.setProgress(nextQuestion + 1);
            }, 300); // Match timeout to animation duration
        }
    };

    const goToPreviousQuestion = async () => {
        if (currentQuestion > 0) {
            if (submitRef.current) {
                submitRef.current.click();
            } // Notify question components to submit
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
                    strings: props.strings,
                    submitRef: submitRef,
                })}
            </div>
            <div className="flex justify-between mt-10">
                {currentQuestion > 0 ?
                    <Button variant="ghost" onClick={goToPreviousQuestion} className="px-4 py-2">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {props.strings.previousPageButton}
                    </Button> :
                    <div></div>
                }
                {currentQuestion === totalQuestions - 1 ?
                    <Link href={`/${props.locale}/home/learn`}>
                        <Button variant="default" className="px-4 py-2" onClick={() => setLoading(true)} disabled={loading}>
                            {loading ?
                                <Loader2 className="h-[1.2rem] w-[1.2rem] animate-spin" /> :
                                props.strings.finishButton
                            }
                        </Button>
                    </Link> :
                    <Button variant="ghost" onClick={goToNextQuestion} className="px-4 py-2">
                        {props.strings.nextPageButton}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                }
            </div>
        </div>
    );
}