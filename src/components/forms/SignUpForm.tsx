"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import PasswordFormField from "./PasswordFormField";
import { Input } from "@/components/shadcn-ui/input"
import { Button } from "@/components/shadcn-ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn-ui/form"

type SignUpFormProps = {
    emailLabel: string,
    passwordLabel: string,
    passwordConfirmLabel: string,
    passwordDescription: string,
    showPasswordTooltip: string,
    hidePasswordTooltip: string,
    submitLabel: string,
}

const formSchema = z.object({
    email: z.string().email().min(5, {
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(10, {
        message: "Your password must be at least 10 characters long.",
    }),
    confirmedPassword: z.string().min(10, {
        message: "Your passwords do not match.",
    }),
})

export default function SignUpForm(props: SignUpFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmedPassword: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{props.emailLabel}</FormLabel>
                            <FormControl>
                                <Input type="email" {...field}/>
                            </FormControl>
                            <FormDescription/>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <PasswordFormField
                            label={props.passwordLabel}
                            description={props.passwordDescription}
                            showPasswordTooltip={props.showPasswordTooltip}
                            hidePasswordTooltip={props.hidePasswordTooltip}
                            field={field}
                            index={0}
                        />
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmedPassword"
                    render={({field}) => (
                        <PasswordFormField
                            label={props.passwordConfirmLabel}
                            description={undefined}
                            showPasswordTooltip={props.showPasswordTooltip}
                            hidePasswordTooltip={props.hidePasswordTooltip}
                            field={field}
                            index={1}
                        />
                    )}
                />
                <div className="flex justify-end mt-15">
                    <Button type="submit">{props.submitLabel}</Button>
                </div>
            </form>
        </Form>
    );
}

/*<div className="flex flex-col space-y-2">
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
                                    <EyeOff className="h-[1.2rem] w-[1.2rem]" aria-hidden="true"/> :
                                    <Eye className="h-[1.2rem] w-[1.2rem]" aria-hidden="true"/>
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
                    </div> */