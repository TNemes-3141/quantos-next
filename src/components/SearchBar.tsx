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


export default function SearchBar() {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <>
            <div className="border border-border rounded-md flex justify-start items-center gap-2 p-2 cursor-pointer" onClick={handleClick}>
                <Search className="mr-2 h-[1.2rem] w-[1.2rem]" />
                <p className="text-muted-foreground">Search...</p>
            </div>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search..." />
                <CommandList>
                    <CommandEmpty>ಥ_ಥ No results found</CommandEmpty>
                    <CommandGroup heading="Navigation">
                        <CommandItem>
                            <Atom className="mr-2 h-4 w-4" />
                            <span>Learn</span>
                        </CommandItem>
                        <CommandItem>
                            <CodeXml className="mr-2 h-4 w-4" />
                            <span>Code</span>
                        </CommandItem>
                        <CommandItem>
                            <LineChart className="mr-2 h-4 w-4" />
                            <span>Statistics</span>
                        </CommandItem>
                        <CommandItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Helpful functions">
                        <CommandItem>
                            <UserCog className="mr-2 h-4 w-4" />
                            <span>Change personal settings</span>
                        </CommandItem>
                        <CommandItem>
                            <KeyRound className="mr-2 h-4 w-4" />
                            <span>Change password</span>
                        </CommandItem>
                        <CommandItem>
                            <SquareAsterisk className="mr-2 h-4 w-4" />
                            <span>Manage access codes</span>
                        </CommandItem>
                        <CommandItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Activate low vision mode</span>
                        </CommandItem>
                        <CommandItem>
                            <Palette className="mr-2 h-4 w-4" />
                            <span>Adjust for color blindness</span>
                        </CommandItem>
                        <CommandItem>
                            <CircleHelp className="mr-2 h-4 w-4" />
                            <span>Get help</span>
                        </CommandItem>
                        <CommandItem>
                            <Info className="mr-2 h-4 w-4" />
                            <span>View app information</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Lections">
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