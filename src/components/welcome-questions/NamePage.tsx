"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import { userDataAtom } from "@/stores/userDataStore";
import { QuestionComponentType } from "@/app/[locale]/welcome/questionComponents";
import { updateUserName } from "@/app/[locale]/welcome/actions";

import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Input } from "../shadcn-ui/input";

export const NamePage: QuestionComponentType = ({ strings, submitRef }) => {
    const [name, setName] = useState("");
    const [user, setUser] = useAtom(userDataAtom);

    const handleChange = (event: any) => {
        setName(event.target.value);
    }
    
    const handleSubmit = async () => {
        if (name.length > 0) {
            setUser({id: user.id, name: name})
            await updateUserName(name);
        }
    }

    return (
        <div className="flex flex-col justify-start items-center space-y-10">
            <p className={cn("text-3xl", secondary_font.className)}>{strings.namePage.title}</p>
            <p>{strings.namePage.question}</p>
            <div className="w-full max-w-[200px] py-10">
                <Input
                    type="text"
                    placeholder={strings.namePage.placeholder}
                    onChange={handleChange}
                />
                <button className="hidden" ref={submitRef} onClick={handleSubmit}></button>
            </div>
        </div>
    );
}