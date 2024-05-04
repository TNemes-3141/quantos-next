"use client";

import { useAtom, WritableAtom } from "jotai"
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

type PasswordFormFieldProps = {
    label: string,
    description: string | undefined,
    showPasswordTooltip: string,
    hidePasswordTooltip: string,
    field: any,
    atom: WritableAtom<boolean, [update: boolean], void>
}

export default function PasswordFormField({ field, label, description, showPasswordTooltip, hidePasswordTooltip, atom }: PasswordFormFieldProps) {
    const [showPassword, setShowPassword] = useAtom(atom);

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