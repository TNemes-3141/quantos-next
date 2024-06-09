"use client";
import { ReactNode, useRef } from 'react';
import useMediaQuery from '@/lib/useMediaQuery';

import { secondary_font } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { OutlineElement } from '@/lib/contentTypes';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/shadcn-ui/popover"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/shadcn-ui/drawer"
import { Button } from '../shadcn-ui/button';


type OutlinePanelProps = {
    title: string,
    text: string,
    outline: OutlineElement[]
    closeButton: string,
    jumpToPage: (page: number) => Promise<void>;
    children: ReactNode
}

export default function OutlinePanel(props: OutlinePanelProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    const onJumpToPage = async (page: number) => {
        if (closeButtonRef.current) {
            closeButtonRef.current.click();
        }

        await props.jumpToPage(page);
    }

    if (isDesktop) {
        return (
            <Popover>
                <PopoverTrigger asChild>
                   {props.children}
                </PopoverTrigger>
                <PopoverContent>
                    <div className='flex flex-col'>
                        <p className="font-bold">{props.title}</p>
                        <p className='text-muted-foreground text-sm'>{props.text}</p>
                        <div className="relative flex flex-col items-start p-4">
                            <ul className="relative space-y-4">
                                {props.outline.map((outlineItem, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center space-x-4 cursor-pointer hover:bg-accent p-2 rounded-md"
                                        onClick={async () => await onJumpToPage(outlineItem.pagenumber)}
                                    >
                                        <div className='bg-secondary rounded-full w-[40px] h-[40px] flex-shrink-0 flex items-center justify-center'>
                                            <p className={cn("font-bold", secondary_font.className)}>{index + 1}</p>
                                        </div>
                                        <span>{outlineItem.sectiontitle}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }
    else {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    {props.children}
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="font-bold">{props.title}</DrawerTitle>
                    </DrawerHeader>
                    <div className='text-muted-foreground text-sm px-4'>
                        {props.text}
                    </div>
                    <div className="relative flex flex-col items-start p-4">
                            <ul className="relative space-y-4">
                                {props.outline.map((outlineItem, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center space-x-4 cursor-pointer hover:bg-accent p-2 rounded-md"
                                        onClick={async () => await onJumpToPage(outlineItem.pagenumber)}
                                    >
                                        <div className='bg-secondary rounded-full w-[40px] h-[40px] flex-shrink-0 flex items-center justify-center'>
                                            <p className={cn("font-bold", secondary_font.className)}>{index + 1}</p>
                                        </div>
                                        <span>{outlineItem.sectiontitle}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button ref={closeButtonRef} type='button' variant="secondary">{props.closeButton}</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }
}