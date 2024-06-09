import { SolutionRecord } from "qubo-embedder";

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
                    <span className="text-destructive">
                        {props.consoleOutputFailure}
                    </span>
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
                                <TableHead>Energy</TableHead>
                                <TableHead>Sample</TableHead>
                                <TableHead>Occurrences</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from(props.record.entries()).map((entry, index) => (
                                <TableRow key={index}>
                                    <TableCell>{entry.energy}</TableCell>
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