"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { userDataAtom } from "@/stores/userDataStore";
import { QuestionComponentType } from "@/app/[locale]/welcome/questionComponents";

import { format } from "@/i18n";
import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const AccountTypePage: QuestionComponentType = ({ strings, submitRef }) => {
    let userName = useAtomValue(userDataAtom).name;

    const handleChange = (event: any) => {
        
    }
    
    const handleSubmit = async () => {
        
    }

    return (
        <div className="flex flex-col justify-start items-center space-y-10">
            <p className={cn("text-3xl", secondary_font.className)}>
                {userName ?
                    format(strings.accountTypePage.titleWithName, {"userName": userName}) :
                    strings.accountTypePage.titleWithoutName
                }
            </p>
            
        </div>
    );
}