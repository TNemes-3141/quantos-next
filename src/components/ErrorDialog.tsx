"use client";
import { RefObject } from 'react';
import useMediaQuery from '@/lib/useMediaQuery';

import { secondary_font } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/shadcn-ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/shadcn-ui/drawer"

import { Button } from './shadcn-ui/button';

type ErrorDialogProps = {
    title: string,
    text: string,
    closeButton: string,
    triggerRef: RefObject<HTMLButtonElement>,
}

export default function ErrorDialog(props: ErrorDialogProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button ref={props.triggerRef} className='hidden'>Open</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className={cn('text-destructive font-bold', secondary_font.className)}>{props.title}</DialogTitle>
                    </DialogHeader>
                    {props.text}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button' variant="secondary">{props.closeButton}</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }
    else {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    <Button ref={props.triggerRef} className='hidden'>Open</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className={cn('text-destructive font-bold', secondary_font.className)}>{props.title}</DrawerTitle>
                    </DrawerHeader>
                    <div className='px-4'>
                        {props.text}
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button type='button' variant="secondary">{props.closeButton}</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }
}