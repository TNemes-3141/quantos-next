"use client";

import { atom, useAtom } from "jotai"
import { Eye, EyeOff } from "lucide-react"

import {
    FormDescription,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn-ui/form"
import { Input } from "@/components/shadcn-ui/input"
import { Button } from "@/components/shadcn-ui/button"
import { createBooleanElementAtom } from "@/stores/showPasswordStore";

type PasswordFormFieldProps = {
    label: string,
    description: string | undefined,
    showPasswordTooltip: string,
    hidePasswordTooltip: string,
    field: any,
    index: number
}

export default function PasswordFormField({ field, label, description, showPasswordTooltip, hidePasswordTooltip, index }: PasswordFormFieldProps) {
    const [showPassword, setShowPassword] = useAtom(createBooleanElementAtom(index));

    return (
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <div className="flex w-full items-center space-x-2">
                    <Input type={showPassword ? "text" : "password"} {...field} />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setShowPassword(!showPassword) }
                    >
                        {showPassword ?
                            <EyeOff className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" /> :
                            <Eye className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
                        }
                        <span className="sr-only">{showPassword ? hidePasswordTooltip : showPasswordTooltip}</span>
                    </Button>
                </div>
            </FormControl>
            {description ? <FormDescription>{description}</FormDescription> : <></>}
            <FormMessage />
        </FormItem>
    );
}