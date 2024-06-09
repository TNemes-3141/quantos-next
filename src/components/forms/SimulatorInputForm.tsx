"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "../shadcn-ui/textarea";
import { useToast } from "../shadcn-ui/use-toast";


type SimulatorInputFormProps = {
    onSubmit: (hamiltonian: number[][]) => Promise<void>;
    hamiltonianLabel: string,
    hamiltonianPlaceholder: string,
    hamiltonianInstruction: string,
    hamiltonianError: string,
    sendButtonLabel: string,
    sendSuccessToast: string,
}

export default function SimulatorInputForm(props: SimulatorInputFormProps) {
    const { toast } = useToast();

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


    async function handleSubmit(data: z.infer<typeof FormSchema>) {
        const matrix = JSON.parse(data.matrix);
        toast({
            title: props.sendSuccessToast,
        });
        await props.onSubmit(matrix);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-2/3 space-y-4">
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
                    <Button type="submit">{props.sendButtonLabel}</Button>
                </div>
            </form>
        </Form>
    );
}
