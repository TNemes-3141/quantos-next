"use client";

import { useState } from "react";
import { SolutionRecord, Solver, Qubo, Hamiltonian } from "qubo-embedder";
import AnnealingOutput, { OutputState } from "./AnnealingOutput";
import SimulatorInputForm from "./forms/SimulatorInputForm";
import ProbabilityDistributionDisplay from "./ProbabilityDistributionDisplay";

import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";


type SimulatorInterfaceProps = {
    strings: {
        inputSubheading: string,
        hamiltonianLabel: string,
        hamiltonianPlaceholder: string,
        hamiltonianInstruction: string,
        hamiltonianError: string,
        sendButtonLabel: string,
        sendSuccessToast: string,
        resultsSubheading: string,
        responseSubheadingsSimulator: string,
        consoleOutputIdle: string,
        consoleOutputLoading: string,
        consoleOutputSuccess: string,
        consoleOutputFailure: string,
        columnHeaderEnergy: string,
        columnHeaderSample: string,
        columnHeaderOccurrences: string,
        probabilitySubheading: string,
        probabilitySliderLabel: string,
        probabilityDescription: string,
        probabilityBarLabel: string,
        percentFormat: string,
    }
}

export default function SimulatorInterface(props: SimulatorInterfaceProps) {
    const [outputState, setOutputState] = useState<OutputState>(OutputState.Standby);
    const [record, setRecord] = useState<SolutionRecord | null>(null);
    const [energies, setEnergies] = useState<number[]>([]);

    const onSubmit = async (hamiltonian: number[][]) => {
        try {
            setOutputState(OutputState.Waiting);
            const simulator = Solver.simulator();
            const qubo = Qubo.fromHamiltonian(Hamiltonian.fromList(hamiltonian));
            let recs = 0;
            if (hamiltonian.length === 1) {
                recs = 2;
            } else if (hamiltonian.length === 2) {
                recs = 4;
            } else if (hamiltonian.length >= 2) {
                recs = 5;
            }

            const solution = await simulator.sampleQubo(qubo, recs);

            const energies = Array.from(solution.entries()).map(entry => entry.energy);

            setRecord(solution);
            setEnergies(energies)
            setOutputState(OutputState.Success);

        } catch (error) {
            console.error('Error:', error);
            setRecord(null);
            setEnergies([]);
            setOutputState(OutputState.Failure);
        }
    } 

    return (
        <div className="flex flex-col gap-6 items-start">
            <h2 className={cn('font-semibold text-2xl tracking-tight mt-6', secondary_font.className)}>
                {props.strings.inputSubheading}
            </h2>
            <div className="flex justify-center w-full">
                <SimulatorInputForm
                    onSubmit={onSubmit}
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
                responseSubheading={props.strings.responseSubheadingsSimulator}
                consoleOutputIdle={props.strings.consoleOutputIdle}
                consoleOutputLoading={props.strings.consoleOutputLoading}
                consoleOutputSuccess={props.strings.consoleOutputSuccess}
                consoleOutputFailure={props.strings.consoleOutputFailure}
                columnHeaderEnergy={props.strings.columnHeaderEnergy}
                columnHeaderSample={props.strings.columnHeaderSample}
                columnHeaderOccurrences={props.strings.columnHeaderOccurrences}
            />
            <ProbabilityDistributionDisplay
                energies={energies}
                probabilitySubheading={props.strings.probabilitySubheading}
                probabilitySliderLabel={props.strings.probabilitySliderLabel}
                probabilityDescription={props.strings.probabilityDescription}
                probabilityBarLabel={props.strings.probabilityBarLabel}
                percentFormat={props.strings.percentFormat}
            />
        </div>
    );
}