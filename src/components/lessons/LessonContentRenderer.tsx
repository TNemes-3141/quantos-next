"use client";

import { useEffect, useState } from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

import { Skeleton } from '../shadcn-ui/skeleton';
import BlurImage from './BlurImage';

import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { secondary_font } from '@/lib/fonts';
import {
    LessonContentElement,
    ImageElement,
    ParagraphElement,
    SectionTitleElement,
    EquationElement,
    InteractiveElement,
} from '@/lib/contentTypes';
import { ContentElementType, ImageModifier } from '@/lib/types';
import { SupabaseClient } from '@supabase/supabase-js';


type LessonContentRendererProps = {
    elements: LessonContentElement[],
}

const fetchImageUrls = async (elements: LessonContentElement[], client: SupabaseClient): Promise<string[]> => {
    return Promise.all(
        elements.map(async (element) => {
            if (element.type === ContentElementType.IMAGE) {
                const { data, error } = await client.storage
                    .from('lesson-materials')
                    .createSignedUrl((element as ImageElement).asset, 60); // URL valid for 60 seconds
                if (error) {
                    console.error('Error fetching image URL:', error);
                    return '';
                }
                return data.signedUrl;
            }
            return '';
        })
    );
};

const renderParagraph = (element: ParagraphElement, key: number) => {
    return <p key={key}>{element.text}</p>;
};

const renderSectionTitle = (element: SectionTitleElement, key: number) => {
    return <h2
        key={key}
        className={cn('font-semibold text-2xl tracking-tight', secondary_font.className)}
    >
        {element.title}
    </h2>;
};

const renderImage = (element: ImageElement, url: string, key: number) => {
    return (
        <div
            key={key}
            className={cn("flex flex-col space-y-2 items-center w-full", {
                'hidden dark:block': element.modifier === ImageModifier.DARK,
                'block dark:hidden': element.modifier === ImageModifier.LIGHT,
            })}
        >
            <div className="w-full flex justify-center px-6">
                {url ? <BlurImage
                    src={url}
                    alttext={element.alttext}
                /> : <Skeleton className='w-[400px] h-[400px] rounded-md'/>}
            </div>
            <p className="text-sm text-muted-foreground text-center">{element.caption}</p>
        </div>
    );
};

export default function LessonContentRenderer({ elements }: LessonContentRendererProps) {
    const supabase = createClient();
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    //console.log(elements);

    useEffect(() => {
        const loadUrls = async () => {
            const urls = await fetchImageUrls(elements, supabase);
            //console.log(urls.length);
            setImageUrls(urls);
        };

        loadUrls();
    }, [elements]);

    return (
        <div className="flex flex-col justify-start items-start gap-6">
            {elements.map((element, index) => {
                switch (element.type) {
                    case ContentElementType.PARAGRAPH:
                        return renderParagraph(element as ParagraphElement, index);

                    case ContentElementType.SECTION_TITLE:
                        return renderSectionTitle(element as SectionTitleElement, index);

                    case ContentElementType.IMAGE:
                        return renderImage(element as ImageElement, imageUrls[index], index);

                    /*case ContentElementType.EQUATION:
                      return renderEquation(element as EquationElement);
          
                    case ContentElementType.INTERACTIVE:
                      return renderInteractive(element as InteractiveElement);*/

                    default:
                        return null;
                }
            })}
        </div>
    );
}