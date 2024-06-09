import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/shadcn-ui/tabs"
import SimulatorInterface from "@/components/SimulatorInterface";
import AnnealerInterface from "@/components/AnnealerInterface";

import { LocalizedProps } from "@/i18n";
import { secondary_font } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type PageContentProps = LocalizedProps & {
    userId: string,
}

export default async function PageContent({ userId, locale, translate }: PageContentProps) {
    const strings = {
        inputSubheading: translate("code.inputSubheading"),
        apiTokenField: {
            label: translate("code.apiTokenField.label"),
            placeholder: translate("code.apiTokenField.placeholder"),
            instruction: translate("code.apiTokenField.instruction"),
            error: translate("code.apiTokenField.error"),
        },
        hamiltonianMatrixField: {
            label: translate("code.hamiltonianMatrixField.label"),
            placeholder: translate("code.hamiltonianMatrixField.placeholder"),
            instruction: translate("code.hamiltonianMatrixField.instruction"),
            error: translate("code.hamiltonianMatrixField.error"),
        },
        sendSuccessToast: translate("code.sendSuccessToast"),
        sendButtonLabel: translate("code.sendButtonLabel"),
        resultsSubheading: translate("code.resultsSubheading"),
        responseSubheadings: {
            simulator: translate("code.responseSubheadings.simulator"),
            annealer: translate("code.responseSubheadings.annealer"),
        },
        consoleOutput: {
            idle: translate("code.consoleOutput.idle"),
            loading: translate("code.consoleOutput.loading"),
            successSimulator: translate("code.consoleOutput.successSimulator"),
            successAnnealer: translate("code.consoleOutput.successAnnealer"),
            failure: translate("code.consoleOutput.failure"),
        },
        columnHeaders: {
            energy: translate("code.columnHeaders.energy"),
            sample: translate("code.columnHeaders.sample"),
            occurrences: translate("code.columnHeaders.occurrences"),
        },
        probabilitySubheading: translate("code.probabilitySubheading"),
        probabilitySliderLabel: translate("code.probabilitySliderLabel"),
        probabilityDescription: translate("code.probabilityDescription"),
        percentFormat: translate("percentFormat"),
    }

    return (
        <div className="flex flex-col space-y-10 items-center">
            <p className={cn("text-4xl mx-auto font-bold text-center", secondary_font.className)}>
                {translate("code.heading")}
            </p>
            <p>
                {translate("code.headerText")}
            </p>
            <Tabs defaultValue="simulator" className="w-full max-w-[1200px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="simulator">{translate("code.tabs.simulator")}</TabsTrigger>
                    <TabsTrigger value="annealer">{translate("code.tabs.annealer")}</TabsTrigger>
                </TabsList>
                <TabsContent value="simulator">
                    <SimulatorInterface
                        strings={{
                            inputSubheading: strings.inputSubheading,
                            hamiltonianLabel: strings.hamiltonianMatrixField.label,
                            hamiltonianPlaceholder: strings.hamiltonianMatrixField.placeholder,
                            hamiltonianInstruction: strings.hamiltonianMatrixField.instruction,
                            hamiltonianError: strings.hamiltonianMatrixField.error,
                            sendButtonLabel: strings.sendButtonLabel,
                            sendSuccessToast: strings.sendSuccessToast,
                            resultsSubheading: strings.resultsSubheading,
                            responseSubheadingsSimulator: strings.responseSubheadings.simulator,
                            consoleOutputIdle: strings.consoleOutput.idle,
                            consoleOutputLoading: strings.consoleOutput.loading,
                            consoleOutputSuccess: strings.consoleOutput.successSimulator,
                            consoleOutputFailure: strings.consoleOutput.failure,
                            columnHeaderEnergy: strings.columnHeaders.energy,
                            columnHeaderSample: strings.columnHeaders.sample,
                            columnHeaderOccurrences: strings.columnHeaders.occurrences,
                            probabilitySubheading: strings.probabilitySubheading,
                            probabilitySliderLabel: strings.probabilitySliderLabel,
                            probabilityDescription: strings.probabilityDescription,
                            percentFormat: strings.percentFormat,
                        }}
                    />
                </TabsContent>
                <TabsContent value="annealer">
                    <AnnealerInterface
                        strings={{
                            inputSubheading: strings.inputSubheading,
                            apiTokenLabel: strings.apiTokenField.label,
                            apiTokenPlaceholder: strings.apiTokenField.placeholder,
                            apiTokenInstruction: strings.apiTokenField.instruction,
                            apiTokenError: strings.apiTokenField.error,
                            hamiltonianLabel: strings.hamiltonianMatrixField.label,
                            hamiltonianPlaceholder: strings.hamiltonianMatrixField.placeholder,
                            hamiltonianInstruction: strings.hamiltonianMatrixField.instruction,
                            hamiltonianError: strings.hamiltonianMatrixField.error,
                            sendButtonLabel: strings.sendButtonLabel,
                            sendSuccessToast: strings.sendSuccessToast,
                            resultsSubheading: strings.resultsSubheading,
                            responseSubheadingsAnnealer: strings.responseSubheadings.annealer,
                            consoleOutputIdle: strings.consoleOutput.idle,
                            consoleOutputLoading: strings.consoleOutput.loading,
                            consoleOutputSuccess: strings.consoleOutput.successAnnealer,
                            consoleOutputFailure: strings.consoleOutput.failure,
                            columnHeaderEnergy: strings.columnHeaders.energy,
                            columnHeaderSample: strings.columnHeaders.sample,
                            columnHeaderOccurrences: strings.columnHeaders.occurrences,
                        }}    
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}