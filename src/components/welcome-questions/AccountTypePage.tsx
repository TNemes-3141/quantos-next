"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { userDataAtom } from "@/stores/userDataStore";
import { QuestionComponentType } from "@/app/[locale]/welcome/questionComponents";
import { updateAccountType } from "@/app/[locale]/welcome/actions";

import { format } from "@/i18n";
import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Button } from "../shadcn-ui/button";
import {
    Command,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../shadcn-ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../shadcn-ui/popover";
import { Check, ChevronsUpDown, Apple, GraduationCap } from "lucide-react"

type AccountTypes = "student" | "educator" | undefined;

type AccountType = {
    value: AccountTypes,
    label: string,
    description: string,
    icon: any,
}

export const AccountTypePage: QuestionComponentType = ({ strings, submitRef }) => {
    let userData = useAtomValue(userDataAtom);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<AccountTypes>(undefined);

    const accountTypes: AccountType[] = [
        {
            value: "student",
            label: strings.accountTypePage.optionStudentTitle,
            description: strings.accountTypePage.optionStudentDescription,
            icon: <Apple className="mr-2 h-[1.2rem] w-[1.2rem]" key={0} />
        },
        {
            value: "educator",
            label: strings.accountTypePage.optionTeacherTitle,
            description: strings.accountTypePage.optionTeacherDescription,
            icon: <GraduationCap className="mr-2 h-[1.2rem] w-[1.2rem]" key={1} />
        },
    ];

    const handleChange = (newValue: string) => {
        const newValueValid = newValue as AccountTypes;
        setValue(newValueValid === value ? undefined : newValueValid);
        setOpen(false);
    }

    const handleSubmit = async () => {
        if (value) {
            await updateAccountType(value, userData.id);
        }
    }

    return (
        <div className="flex flex-col justify-start items-center space-y-10">
            <p className={cn("text-3xl", secondary_font.className)}>
                {userData.name ?
                    format(strings.accountTypePage.titleWithName, { "userName": userData.name }) :
                    strings.accountTypePage.titleWithoutName
                }
            </p>
            <div className="py-10">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full max-w-[350px] justify-between"
                        >
                            {value
                                ? accountTypes.find((accountType) => accountType.value === value)?.label
                                : strings.accountTypePage.chooseOption}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full max-w-[350px] p-0">
                        <Command>
                            <CommandList>
                                <CommandEmpty>No type available.</CommandEmpty>
                                <CommandGroup>
                                    {accountTypes.map((accountType) => (
                                        <CommandItem
                                            key={accountType.value}
                                            value={accountType.value}
                                            onSelect={handleChange}
                                        >
                                            <Check
                                                className={cn(
                                                    "flex-shrink-0 mr-2 h-4 w-4",
                                                    value === accountType.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            <div className="flex flex-col gap-2">
                                                <div className="flex">
                                                    {accountType.icon}
                                                    <p className="font-bold">{accountType.label}</p>
                                                </div>
                                                <p>{accountType.description}</p>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <button className="hidden" ref={submitRef} onClick={handleSubmit}></button>
        </div>
    );
}