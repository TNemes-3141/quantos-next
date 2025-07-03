"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

import { Button } from "../shadcn-ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../shadcn-ui/form";
import { Input } from "../shadcn-ui/input";
import { Textarea } from "../shadcn-ui/textarea";
import { useToast } from "../shadcn-ui/use-toast";


type AnnealerInputFormProps = {
    onSubmit: (data: { label: string; hamiltonian: number[][] }) => Promise<void>;
    apiTokenLabel: string,
    apiTokenPlaceholder: string,
    apiTokenInstruction: string,
    apiTokenError: string,
    hamiltonianLabel: string,
    hamiltonianPlaceholder: string,
    hamiltonianInstruction: string,
    hamiltonianError: string,
    sendButtonLabel: string,
    sendSuccessToast: string,
}

export default function AnnealerInputForm(props: AnnealerInputFormProps) {
    const { toast } = useToast();
    const [secondsLeft, setSecondsLeft] = useState(0);

    // Countdown effect for button cooldown
    useEffect(() => {
        if (secondsLeft <= 0) {
            return;
        }
        const timer = setTimeout(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [secondsLeft]);

    const matrixSchema = z
        .string()
        .refine((val) => {
            try {
                const parsed = JSON.parse(val);
                if (!Array.isArray(parsed)) return false;
                const size = parsed.length;
                return parsed.every(
                    (row: number[], rowIndex: number) =>
                        Array.isArray(row) &&
                        row.length === size &&
                        row.slice(0, rowIndex).every((val) => val === 0)
                );
            } catch {
                return false;
            }
        }, props.hamiltonianError);
    const FormSchema = z.object({
        matrix: matrixSchema,
    });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            matrix: "",
        },
    });

    const formatJSON = (obj: any) => {
        return JSON.stringify(obj, (key, value) => {
            if (Array.isArray(value)) {
                return JSON.stringify(value);
            }
            return value;
        }, 2).replace(/"\[/g, '[').replace(/\]"/g, ']').replace(/\\"/g, '"');
    };

    async function handleSubmit(data: z.infer<typeof FormSchema>) {
        // Start 5-second cooldown
        setSecondsLeft(5);

        const matrix = JSON.parse(data.matrix);
        toast({
            title: props.sendSuccessToast,
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-popover p-4">
                    <code className="text-popover-foreground break-words whitespace-pre-wrap">
                        {formatJSON({ matrix })}
                    </code>
                </pre>
            ),
        });
        await props.onSubmit({ label: "Quantos", hamiltonian: matrix });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-2/3 space-y-4">
                {/*<FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{props.apiTokenLabel}</FormLabel>
                            <FormControl>
                                <Input placeholder={props.apiTokenPlaceholder} {...field} />
                            </FormControl>
                            <FormDescription>
                                {props.apiTokenInstruction}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />*/}
                <FormField
                    control={form.control}
                    name="matrix"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{props.hamiltonianLabel}</FormLabel>
                            <FormControl>
                                <Textarea placeholder={props.hamiltonianPlaceholder} {...field} rows={10} />
                            </FormControl>
                            <FormDescription>
                                {props.hamiltonianInstruction}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-center">
                    <Button type="submit" disabled={secondsLeft > 0}>
                        {secondsLeft > 0 ? secondsLeft : props.sendButtonLabel}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
