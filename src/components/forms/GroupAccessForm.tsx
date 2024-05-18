"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { submitAccessCode } from "@/app/[locale]/auth/group-access/actions";
import { DbAccessCodeResponse } from "@/lib/types";
import { ValidLocale } from "@/i18n";

import { Loader2 } from "lucide-react";
import ErrorDialog from "../ErrorDialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/shadcn-ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/components/shadcn-ui/input-otp"



type LogInFormProps = {
    accessCodeLabel: string,
    submitLabel: string,
    errorTitle: string,
    errorTextCodeNotFound: string,
    errorTextCodeNotActive: string,
    errorTextCodeExpired: string,
    errorTextUnknownError: string,
    errorCloseButton: string,
    locale: ValidLocale
}

const formSchema = z.object({
    code: z.string().min(6),
})

export default function GroupAccessForm(props: LogInFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
        },
    });

    const openDialogButtonRef = useRef<HTMLButtonElement>(null);
    const [errorText, setErrorText] = useState("Default body text");
    const [loading, setLoading] = useState(false);

    const handleChange = async (newValue: string) => {
        if (newValue.length == 6) {
            await onSubmit(newValue);
        }
    }

    const onSubmit = async (code: string) => {
        if (loading) {
            return;
        }
        setLoading(true);
        const { responseCode, errorMessage } = await submitAccessCode(code, props.locale);

        if (errorMessage) {
            console.log(errorMessage);
        }

        if (responseCode == DbAccessCodeResponse.CODE_NOT_FOUND ||
            responseCode == DbAccessCodeResponse.CODE_NOT_ACTIVE ||
            responseCode == DbAccessCodeResponse.CODE_EXPIRED ||
            responseCode == DbAccessCodeResponse.UNKNOWN_ERROR) {
            openErrorDialog(responseCode);
        }
        setLoading(false);
    }

    const openErrorDialog = (status: DbAccessCodeResponse) => {
        switch (status) {
            case DbAccessCodeResponse.CODE_NOT_FOUND:
                setErrorText(props.errorTextCodeNotFound);
                break;
            case DbAccessCodeResponse.CODE_NOT_ACTIVE:
                setErrorText(props.errorTextCodeNotActive);
                break;
            case DbAccessCodeResponse.CODE_EXPIRED:
                setErrorText(props.errorTextCodeExpired);
                break;
            case DbAccessCodeResponse.UNKNOWN_ERROR:
                setErrorText(props.errorTextUnknownError);
                break;
        }

        if (openDialogButtonRef.current) {
            openDialogButtonRef.current.click();
        }
    }

    return (
        <>
            <Form {...form}>
                <form className="w-full space-y-4">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{props.accessCodeLabel}</FormLabel>
                                <FormControl>
                                    <InputOTP
                                        maxLength={6}
                                        onChange={handleChange}
                                        pattern="^[A-Z0-9]+$"
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
            {loading ? <div className="flex justify-center my-5"><Loader2 className="mr-2 h-4 w-4 animate-spin" /></div> : <></>}
            <ErrorDialog
                title={props.errorTitle}
                text={errorText}
                closeButton={props.errorCloseButton}
                triggerRef={openDialogButtonRef}
            />
        </>
    );
}
