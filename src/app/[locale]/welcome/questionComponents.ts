import { FC, MutableRefObject } from "react";
import { WelcomeLocalizedStrings } from "@/lib/types";

export interface QuestionItemProps {
    strings: WelcomeLocalizedStrings,
    submitRef: MutableRefObject<HTMLButtonElement | null>,
}

export type QuestionComponentType = FC<QuestionItemProps>;