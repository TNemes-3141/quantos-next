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

import { LocalizedProps } from "@/i18n";


export default function ProfilePanel() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Profile actions">
                    <CircleUser className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Profile actions</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => redirect("/")}>
                    Personal settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => redirect("/")}>
                    Help center
                </DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => redirect("/")}>
                    <LogOut className="mr-2 h-4 w-4" color="#e7184c"/>
                    <span className="text-destructive">Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}