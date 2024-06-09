"use client";

import { useState } from "react";
import Image from "next/image";
import { AspectRatio } from "../shadcn-ui/aspect-ratio";

import { cn } from "@/lib/utils";


type BlurImageProps = {
    src: string,
    alttext: string,
}

export default function BlurImage({ src, alttext }: BlurImageProps) {
    const [isLoading, setLoading] = useState(true);

    return (
        <div className="w-[250px] md:w-[400px] bg-container rounded-lg overflow-hidden relative">
            <AspectRatio ratio={1} className="relative">
                <Image
                    src={src}
                    alt={alttext}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "contain" }}
                    className={cn(
                        'group-hover:opacity-75 duration-700 ease-in-out',
                        isLoading
                            ? 'grayscale blur-xl scale-110'
                            : 'grayscale-0 blur-0 scale-100'
                    )}
                    onLoad={() => setLoading(false)}
                />
            </AspectRatio>
        </div>
    );
}