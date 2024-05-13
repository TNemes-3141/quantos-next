import { QuestionComponentType } from "@/app/[locale]/welcome/questionComponents";
import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const FinalPage: QuestionComponentType = ({ strings }) => {
    return (
        <div className="flex flex-col justify-start items-center">
            <p className={cn("text-3xl font-bold mb-10", secondary_font.className)}>{strings.finalPage.title}</p>
        </div>
    );
}