"use client";

import { Eye, EyeOff } from "lucide-react"
import { atom, useAtom } from "jotai"

import { Input } from "@/components/shadcn-ui/input"
import { Label } from "@/components/shadcn-ui/label"
import { Button } from "@/components/shadcn-ui/button"

type SignUpFormProps = {
    emailLabel: string,
    passwordLabel: string,
    passwordConfirmLabel: string,
    showPasswordTooltip: string,
    hidePasswordTooltip: string,
}

const showPasswordAtom = atom(false);

export default function SignUpForm(props: SignUpFormProps) {
    const [showPassword, setShowPassword] = useAtom(showPasswordAtom);

    return (
        <form>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="email">{props.emailLabel}</Label>
                    <Input id="email" type="email" />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="password">{props.passwordLabel}</Label>
                    <div className="flex w-full items-center space-x-2">
                        <Input id="password" type={showPassword ? "text" : "password"} />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => { setShowPassword(!showPassword) }}
                        >
                            {showPassword ?
                                <EyeOff className="h-[1.2rem] w-[1.2rem]" /> :
                                <Eye className="h-[1.2rem] w-[1.2rem]" />
                            }
                            <span className="sr-only">{showPassword ? props.hidePasswordTooltip : props.showPasswordTooltip}</span>
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="passwordConfirm">{props.passwordConfirmLabel}</Label>
                    <div className="flex w-full items-center space-x-2">
                        <Input id="passwordConfirm" type={showPassword ? "text" : "password"} />
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => { setShowPassword(!showPassword) }}
                        >
                            {showPassword ?
                                <EyeOff className="h-[1.2rem] w-[1.2rem]" /> :
                                <Eye className="h-[1.2rem] w-[1.2rem]" />
                            }
                            <span className="sr-only">{showPassword ? props.hidePasswordTooltip : props.showPasswordTooltip}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}