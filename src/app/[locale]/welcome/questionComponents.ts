import { FC } from "react";

export interface QuestionItemProps {
    data: any;
    onChange: (value: any) => void;
}

export type QuestionComponentType = FC<QuestionItemProps>;