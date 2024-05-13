"use client";

import { useState } from "react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/shadcn-ui/command"
import {
    Search,
    Atom,
    CodeXml,
    LineChart,
    Settings,
    UserCog,
    KeyRound,
    SquareAsterisk,
    Eye,
    Palette,
    CircleHelp,
    Info
} from "lucide-react";

type SearchBarProps = {
    strings: SearchBarStrings,
}

export type SearchBarStrings = {
    searchPlaceholder: string,
    noResultsMessage: string,
    commandHeaderNavigation: string,
    commandHeaderShortcuts: string,
    commandHeaderLections: string,
    commands: {
        personalSettings: string,
        password: string,
        accessCodes: string,
        lowVision: string,
        colorBlindness: string,
        help: string,
        info: string
    },
    tabLearn: string,
    tabCode: string,
    tabStatistics: string,
    tabSettings: string,
}

export default function SearchBar({ strings }: SearchBarProps) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <>
            <div className="border border-border rounded-md flex justify-start items-center gap-2 p-2 cursor-pointer" onClick={handleClick}>
                <Search className="mr-2 h-[1.2rem] w-[1.2rem]" />
                <p className="text-muted-foreground">{strings.searchPlaceholder}</p>
            </div>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder={strings.searchPlaceholder} />
                <CommandList>
                    <CommandEmpty>{strings.noResultsMessage}</CommandEmpty>
                    <CommandGroup heading={strings.commandHeaderNavigation}>
                        <CommandItem>
                            <Atom className="mr-2 h-4 w-4" />
                            <span>{strings.tabLearn}</span>
                        </CommandItem>
                        <CommandItem>
                            <CodeXml className="mr-2 h-4 w-4" />
                            <span>{strings.tabCode}</span>
                        </CommandItem>
                        <CommandItem>
                            <LineChart className="mr-2 h-4 w-4" />
                            <span>{strings.tabStatistics}</span>
                        </CommandItem>
                        <CommandItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>{strings.tabSettings}</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading={strings.commandHeaderShortcuts}>
                        <CommandItem>
                            <UserCog className="mr-2 h-4 w-4" />
                            <span>{strings.commands.personalSettings}</span>
                        </CommandItem>
                        <CommandItem>
                            <KeyRound className="mr-2 h-4 w-4" />
                            <span>{strings.commands.password}</span>
                        </CommandItem>
                        <CommandItem>
                            <SquareAsterisk className="mr-2 h-4 w-4" />
                            <span>{strings.commands.accessCodes}</span>
                        </CommandItem>
                        <CommandItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>{strings.commands.lowVision}</span>
                        </CommandItem>
                        <CommandItem>
                            <Palette className="mr-2 h-4 w-4" />
                            <span>{strings.commands.colorBlindness}</span>
                        </CommandItem>
                        <CommandItem>
                            <CircleHelp className="mr-2 h-4 w-4" />
                            <span>{strings.commands.help}</span>
                        </CommandItem>
                        <CommandItem>
                            <Info className="mr-2 h-4 w-4" />
                            <span>{strings.commands.info}</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading={strings.commandHeaderLections}>
                        <CommandItem>Introduction To Quantum Annealers</CommandItem>
                        <CommandItem>The N Queens Problem</CommandItem>
                        <CommandItem>The Traveling Salesman Problem</CommandItem>
                        <CommandItem>Solving Sudoku Riddles</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}