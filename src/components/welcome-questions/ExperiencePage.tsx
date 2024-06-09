"use client";

import { useState, useRef } from "react";
import { useAtomValue } from "jotai";
import { userDataAtom } from "@/stores/userDataStore";
import { QuestionComponentType } from "@/app/[locale]/welcome/questionComponents";
import { updateExperienceLevel } from "@/app/[locale]/welcome/actions";

import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import ExperienceSelectionAnimation, { ExperienceSelectionAnimationRef } from "../ExperienceSelectionAnimation";
import { Slider } from "../shadcn-ui/slider";
import { Label } from "../shadcn-ui/label";


export const ExperiencePage: QuestionComponentType = ({ strings, submitRef }) => {
    const userData = useAtomValue(userDataAtom);
    const [level, setLevel] = useState(0);

    const experienceSelectionAnimationRef = useRef<ExperienceSelectionAnimationRef>(null);

    const getSliderLabel = (): string => {
        switch (level) {
            case 0: return strings.experiencePage.optionBeginner;
            case 1: return strings.experiencePage.optionAdvanced;
            case 2: return strings.experiencePage.optionSkilled;
            default: return "";
        }
    }

    const handleChange = (values: number[]) => {
        const value = values[0] as 0 | 1 | 2;
        setLevel(value);
        experienceSelectionAnimationRef.current?.setExperienceLevel(value);
    }
    
    const handleSubmit = async () => {
        if (level < 0 || level > 2) return;
        
        let experienceLevel: "beginner" | "advanced" | "skilled" = "beginner";
        switch (level) {
            case 1: experienceLevel = "advanced";
            break;
            case 2: experienceLevel = "skilled";
            break;
        }

        await updateExperienceLevel(experienceLevel, userData.id);
    }

    return (
        <div className="flex flex-col justify-start items-center space-y-10">
            <p className={cn("text-3xl font-bold", secondary_font.className)}>{strings.experiencePage.title}</p>
            <p>{strings.experiencePage.question}</p>
            <div className="flex flex-col items-center space-y-6 w-full pb-10">
                <ExperienceSelectionAnimation
                    size={300}
                    ref={experienceSelectionAnimationRef}
                />
                <Slider
                    id="experience-slider"
                    defaultValue={[0]}
                    min={0}
                    max={2}
                    step={1}
                    onValueChange={handleChange}
                    className="w-[60%]"
                />
                <Label htmlFor="experience-slider">{getSliderLabel()}</Label>
            </div>
            <button className="hidden" ref={submitRef} onClick={handleSubmit}></button>
        </div>
    );
}