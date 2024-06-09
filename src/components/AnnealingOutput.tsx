import { SolutionRecord } from "qubo-embedder";
import { OctagonX } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/shadcn-ui/table"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "./shadcn-ui/card";

export enum OutputState {
    Standby,
    Waiting,
    Success,
    Failure,
}

type AnnealingOutputProps = {
    state: OutputState,
    record: SolutionRecord | null,
    responseSubheading: string,
    consoleOutputIdle: string,
    consoleOutputLoading: string,
    consoleOutputSuccess: string,
    consoleOutputFailure: string,
    columnHeaderEnergy: string,
    columnHeaderSample: string,
    columnHeaderOccurrences: string,
}

export default function AnnealingOutput(props: AnnealingOutputProps) {
    const getConsoleOutput = () => {
        switch (props.state) {
            case OutputState.Standby:
                return props.consoleOutputIdle;
            case OutputState.Waiting:
                return (
                    <span className="animate-pulse">
                        {props.consoleOutputLoading}
                    </span>
                );
            case OutputState.Success:
                return props.consoleOutputSuccess;
            case OutputState.Failure:
                return (
                    <div className="flex space-x-2 justify-start items-center">
                        <OctagonX color="#e7184c" className="h-[1.2rem] w-[1.2rem] flex-shrink-0" />
                        <span className="text-destructive">
                            {props.consoleOutputFailure}
                        </span>
                    </div>
                );
            default:
                return "";
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{props.responseSubheading}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    {getConsoleOutput()}
                </div>
                {props.state === OutputState.Success && props.record && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{props.columnHeaderEnergy}</TableHead>
                                <TableHead>{props.columnHeaderSample}</TableHead>
                                <TableHead>{props.columnHeaderOccurrences}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from(props.record.entries()).map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell>{entry.energy.toFixed(1)}</TableCell>
                                    <TableCell>{entry.solutionVector.vector.join(", ")}</TableCell>
                                    <TableCell>{entry.numOccurrences}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}