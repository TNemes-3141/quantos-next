"use client";

import { useState } from "react";
import axios from "axios";
import AnnealerInputForm from "./forms/AnnealerInputForm";
import AnnealingOutput, { OutputState } from "./AnnealingOutput";

import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SolutionRecord, SolutionVector } from "qubo-embedder";


type AnnealerInterfaceProps = {
    strings: {
        inputSubheading: string,
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
        resultsSubheading: string,
        responseSubheadingsAnnealer: string,
        consoleOutputIdle: string,
        consoleOutputLoading: string,
        consoleOutputSuccess: string,
        consoleOutputFailure: string,
    }
}

export default function AnnealerInterface(props: AnnealerInterfaceProps) {
    const [outputState, setOutputState] = useState<OutputState>(OutputState.Standby);
    const [record, setRecord] = useState<SolutionRecord | null>(null);

    const onSubmit = async (data: { token: string; hamiltonian: number[][] }) => {
        try {
            setOutputState(OutputState.Waiting);
            const { token, hamiltonian } = data;
            const response = await axios.post('/api/solve-hamiltonian', { hamiltonian, token });

            const solutions = response.data.solutions;
            const solutionRecord = new SolutionRecord(10); // Create a SolutionRecord with capacity 10
            let addedEntries = 0;

            for (let i = 0; i < solutions.length && addedEntries < 10; i++) {
                const entry = solutions[i];
                const solutionVector = SolutionVector.fromList(entry.sample);
                solutionRecord.addEntry(entry.energy, solutionVector, entry.num_occurrences);
                addedEntries++;
            }

            setRecord(solutionRecord);
            setOutputState(OutputState.Success);
        } catch (error) {
            console.error('Error:', error);
            setRecord(null);
            setOutputState(OutputState.Failure);
        }
    }

    return (
        <div className="flex flex-col gap-6 items-start">
            <h2 className={cn('font-semibold text-2xl tracking-tight mt-6', secondary_font.className)}>
                {props.strings.inputSubheading}
            </h2>
            <div className="flex justify-center w-full">
                <AnnealerInputForm
                    onSubmit={onSubmit}
                    apiTokenLabel={props.strings.apiTokenLabel}
                    apiTokenPlaceholder={props.strings.apiTokenPlaceholder}
                    apiTokenInstruction={props.strings.apiTokenInstruction}
                    apiTokenError={props.strings.apiTokenError}
                    hamiltonianLabel={props.strings.hamiltonianLabel}
                    hamiltonianPlaceholder={props.strings.hamiltonianPlaceholder}
                    hamiltonianInstruction={props.strings.hamiltonianInstruction}
                    hamiltonianError={props.strings.hamiltonianError}
                    sendButtonLabel={props.strings.sendButtonLabel}
                    sendSuccessToast={props.strings.sendSuccessToast}
                />
            </div>
            <h2 className={cn('font-semibold text-2xl tracking-tight', secondary_font.className)}>
                {props.strings.resultsSubheading}
            </h2>
            <AnnealingOutput
                state={outputState}
                record={record}
                responseSubheading={props.strings.responseSubheadingsAnnealer}
                consoleOutputIdle={props.strings.consoleOutputIdle}
                consoleOutputLoading={props.strings.consoleOutputLoading}
                consoleOutputSuccess={props.strings.consoleOutputSuccess}
                consoleOutputFailure={props.strings.consoleOutputFailure}
            />
        </div>
    );
}