"use client";

import { redirect } from "next/navigation";

import { Button } from "./shadcn-ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "./shadcn-ui/dropdown-menu"
import { CircleUser, LogOut } from "lucide-react";


type ProfilePanelProps = {
    tooltip: string,
    personalSettings: string,
    helpCenter: string,
    logOut: string,
}

export default function ProfilePanel(props: ProfilePanelProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label={props.tooltip}>
                    <CircleUser className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">{props.tooltip}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => redirect("/")}>
                    {props.personalSettings}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => redirect("/")}>
                    {props.helpCenter}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => redirect("/")}>
                    <LogOut className="mr-2 h-4 w-4" color="#e7184c" />
                    <span className="text-destructive">{props.logOut}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}