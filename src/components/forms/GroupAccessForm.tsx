"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { submitAccessCode } from "@/app/[locale]/auth/group-access/actions";

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

    const handleChange = async (newValue: string) => {
        if (newValue.length == 6) {
            await onSubmit(newValue);
        }
    }

    const onSubmit = async (code: string) => {
        const status = await submitAccessCode(code);
        console.log(status);
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
    );
}
