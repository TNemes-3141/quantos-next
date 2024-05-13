"use client";

import { useState, useRef } from "react";
import { useAtomValue } from "jotai";
import { userDataAtom } from "@/stores/userDataStore";
import { QuestionComponentType } from "@/app/[locale]/welcome/questionComponents";
import { updateAgeGroup } from "@/app/[locale]/welcome/actions";

import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { AgeSelectionAnimation, AgeSelectionAnimationRef } from "../AgeSelectionAnimation";
import { Slider } from "../shadcn-ui/slider";
import { Label } from "../shadcn-ui/label";


export const AgePage: QuestionComponentType = ({ strings, submitRef }) => {
    const userData = useAtomValue(userDataAtom);
    const [level, setLevel] = useState(1);

    const ageSelectionAnimationRef = useRef<AgeSelectionAnimationRef>(null);

    const getSliderLabel = (): string => {
        switch (level) {
            case -1: return strings.agePage.optionNotSpecified;
            case 0: return strings.agePage.optionTeen;
            case 1: return strings.agePage.optionYoungAdult;
            case 2: return strings.agePage.optionAdult;
            case 3: return strings.agePage.optionElder;
            default: return "";
        }
    }

    const handleChange = (values: number[]) => {
        const value = values[0] as -1 | 0 | 1 | 2 | 3;
        setLevel(value);
        ageSelectionAnimationRef.current?.setAgeClass(value);
    }
    
    const handleSubmit = async () => {
        if (level < -1 || level > 3) return;
        
        let ageGroup: "teen" | "young_adult" | "adult" | "elder" | null = null;
        switch (level) {
            case 0: ageGroup = "teen";
            break;
            case 1: ageGroup = "young_adult";
            break;
            case 2: ageGroup = "adult";
            break;
            case 3: ageGroup = "elder";
            break;
        }

        await updateAgeGroup(ageGroup, userData.id);
    }

    return (
        <div className="flex flex-col justify-start items-center space-y-10">
            <p className={cn("text-3xl", secondary_font.className)}>{strings.agePage.title}</p>
            <p>{strings.agePage.question}</p>
            <div className="flex flex-col items-center space-y-6 w-full pb-10">
                <AgeSelectionAnimation
                    size={300}
                    ref={ageSelectionAnimationRef}
                />
                <Slider
                    id="age-slider"
                    defaultValue={[1]}
                    min={-1}
                    max={3}
                    step={1}
                    onValueChange={handleChange}
                    className="w-[60%]"
                />
                <Label htmlFor="age-slider">{getSliderLabel()}</Label>
            </div>
            <button className="hidden" ref={submitRef} onClick={handleSubmit}></button>
        </div>
    );
}