"use client";

import { Button } from "./shadcn-ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./shadcn-ui/dropdown-menu"
import { Globe } from "lucide-react";

export default function LanguageSelector() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Choose language">
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Choose language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => { }}>
                    English (EN)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { }}>
                    Deutsch (DE)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}