"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { login } from "@/app/[locale]/auth/login/actions";

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
import { showPasswordAtomTwo } from "@/stores/showPasswordStore";

type SignUpFormProps = {
    emailLabel: string,
    passwordLabel: string,
    showPasswordTooltip: string,
    hidePasswordTooltip: string,
    submitLabel: string,
}

const formSchema = z.object({
    email: z.string().email().min(5, {
        message: "Please enter a valid email address.",
    }),
    password: z.string(),
})

export default function LogInForm(props: SignUpFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        //TODO: Verify password match

        login(values.email, values.password);
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
                            description={undefined}
                            showPasswordTooltip={props.showPasswordTooltip}
                            hidePasswordTooltip={props.hidePasswordTooltip}
                            field={field}
                            atom={showPasswordAtomTwo}
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
