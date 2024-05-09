"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { login } from "@/app/[locale]/auth/login/actions";

import { Loader2 } from "lucide-react";
import PasswordFormField from "./PasswordFormField";
import ErrorDialog from "../ErrorDialog";
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
import { LoginResponse } from "@/lib/types";

type LogInFormProps = {
    emailLabel: string,
    passwordLabel: string,
    showPasswordTooltip: string,
    hidePasswordTooltip: string,
    submitLabel: string,
    errorTitle: string,
    errorText: string,
    errorCloseButton: string,
}

const formSchema = z.object({
    email: z.string().email().min(5, {
        message: "Please enter a valid email address.",
    }),
    password: z.string(),
})

export default function LogInForm(props: LogInFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const openDialogButtonRef = useRef<HTMLButtonElement>(null);
    const [errorText, setErrorText] = useState(props.errorText);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        const r = await login(values.email, values.password);

        if (r && r.responseCode == LoginResponse.AUTH_API_ERROR && openDialogButtonRef.current) {
            setErrorText(props.errorText + " " + r.errorMessage ?? "");
            openDialogButtonRef.current.click();
        }
        setLoading(false);
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{props.emailLabel}</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field}/>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <PasswordFormField
                                label={props.passwordLabel}
                                description={undefined}
                                showPasswordTooltip={props.showPasswordTooltip}
                                hidePasswordTooltip={props.hidePasswordTooltip}
                                field={field}
                                atom={showPasswordAtomTwo}
                                onClick={() => {}}
                            />
                        )}
                    />
                    <div className="flex justify-end mt-15">
                        <Button type="submit" disabled={loading}>
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <></>}
                            {props.submitLabel}
                        </Button>
                    </div>
                </form>
            </Form>
            <ErrorDialog
                title={props.errorTitle}
                text={errorText}
                closeButton={props.errorCloseButton}
                triggerRef={openDialogButtonRef}
            />
        </>
    );
}
