import { QuestionComponentType } from "@/app/[locale]/welcome/questionComponents";

export const WelcomePage: QuestionComponentType = ({data, onChange}) => {
    return (
        <p>{data.welcomePage.title}</p>
    );
}