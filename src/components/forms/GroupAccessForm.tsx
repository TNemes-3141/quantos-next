"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { login } from "@/app/[locale]/auth/login/actions";

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
    InputOTPSlot,
} from "@/components/shadcn-ui/input-otp"


type LogInFormProps = {
    accessCodeLabel: string,
    submitLabel: string,
}

const formSchema = z.object({
    code: z.string().min(6),
})

export default function GroupAccessForm(props: LogInFormProps) {
    const [code, setCode] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
        },
    });

    const handleChange = (newValue: string) => {
        setCode(newValue);

        if (newValue.length == 6) {
            onSubmit();
        }
    }

    const onSubmit = () => {
        console.log(code);

    }

    return (
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
                                    value={code}
                                    onChange={handleChange}
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
    );
}
