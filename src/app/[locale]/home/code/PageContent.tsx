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
        apiTokenLabel: translate("code.apiTokenLabel"),
        apiTokenPlaceholder: translate("code.apiTokenPlaceholder"),
        hamiltonianLabel: translate("code.hamiltonianLabel"),
        defaultZerosNote: translate("code.defaultZerosNote"),
        sendButtonLabel: translate("code.sendButtonLabel"),
        responseSubheadings: {
            simulator: translate("code.responseSubheadings.simulator"),
            annealer: translate("code.responseSubheadings.annealer"),
        },
        consoleOutput: {
            idle: translate("code.consoleOutput.idle"),
            loading: translate("code.consoleOutput.loading"),
            success: translate("code.consoleOutput.success"),
            failure: translate("code.consoleOutput.failure"),
        },
        probabilitySubheading: translate("code.probabilitySubheading"),
        probabilitySliderLabel: translate("code.probabilitySliderLabel"),
        probabilityDescription: translate("code.probabilityDescription"),
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
                            hamiltonianLabel: strings.hamiltonianLabel,
                            defaultZerosNote: strings.defaultZerosNote,
                            sendButtonLabel: strings.sendButtonLabel,
                            responseSubheadingsSimulator: strings.responseSubheadings.simulator,
                            consoleOutputIdle: strings.consoleOutput.idle,
                            consoleOutputLoading: strings.consoleOutput.loading,
                            consoleOutputSuccess: strings.consoleOutput.success,
                            consoleOutputFailure: strings.consoleOutput.failure,
                            probabilitySubheading: strings.probabilitySubheading,
                            probabilitySliderLabel: strings.probabilitySliderLabel,
                            probabilityDescription: strings.probabilityDescription,
                        }}
                    />
                </TabsContent>
                <TabsContent value="annealer">
                    <AnnealerInterface
                        strings={{
                            inputSubheading: strings.inputSubheading,
                            apiTokenLabel: strings.apiTokenLabel,
                            apiTokenPlaceholder: strings.apiTokenPlaceholder,
                            hamiltonianLabel: strings.hamiltonianLabel,
                            defaultZerosNote: strings.defaultZerosNote,
                            sendButtonLabel: strings.sendButtonLabel,
                            responseSubheadingsAnnealer: strings.responseSubheadings.annealer,
                            consoleOutputIdle: strings.consoleOutput.idle,
                            consoleOutputLoading: strings.consoleOutput.loading,
                            consoleOutputSuccess: strings.consoleOutput.success,
                            consoleOutputFailure: strings.consoleOutput.failure,
                        }}    
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}