import { FC } from "react";
import { WelcomeLocalizedStrings } from "@/lib/types";

export interface QuestionItemProps {
    strings: WelcomeLocalizedStrings,
}

export type QuestionComponentType = FC<QuestionItemProps>;