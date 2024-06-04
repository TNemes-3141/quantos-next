"use client";

import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

import { Skeleton } from '../shadcn-ui/skeleton';
import BlurImage from './BlurImage';
import InteractiveAnimation from './InteractiveAnimation';

import { cn } from '@/lib/utils';
import useMediaQuery from '@/lib/useMediaQuery';
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
import { ValidLocale } from '@/i18n';


type LessonContentRendererProps = {
    elements: LessonContentElement[],
    assetUrls: string[],
    locale: ValidLocale,
}

const renderParagraph = (element: ParagraphElement, key: number) => {
    const parts = element.text.split(/(\n|[*]{2}.*?[*]{2}|\$\$.*?\$\$)/g);

    return (<p key={key}>
        {parts.map((part, index) => {
            if (part === '\n') {
                return <br key={index} />;
            } else if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <span key={index} className="font-bold">
                        {part.substring(2, part.length - 2)}
                    </span>
                );
            } else if (part.startsWith('$$') && part.endsWith('$$')) {
                const math = part.substring(2, part.length - 2);
                return <TeX key={index}>{math}</TeX>;
            } else {
                return part;
            }
        })}
    </p>);
};

const renderSectionTitle = (element: SectionTitleElement, key: number) => {
    return <h2
        key={key}
        className={cn('font-semibold text-2xl tracking-tight', secondary_font.className)}
    >
        {element.title}
    </h2>;
};

const renderImage = (element: ImageElement, url: string | undefined, key: number) => {
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
                /> : <Skeleton className='w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-md' />}
            </div>
            <p className="text-sm text-muted-foreground text-center">{element.caption}</p>
        </div>
    );
};

const renderEquation = (element: EquationElement, key: number) => {
    return <div key={key} className='w-full flex justify-center text-center break-all whitespace-normal'>
        <TeX math={element.tex} block aria-label={element.alttext} />
    </div>;
};

const renderInteractive = (element: InteractiveElement, url: string | undefined, locale: ValidLocale, size: number, key: number) => {
    return (
        <div key={key} className='flex flex-col space-y-2 items-center w-full'>
            {url ? (url.length > 0 ? <InteractiveAnimation
                source={url}
                locale={locale}
                size={size}
            />
                : <div className='w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-card rounded-md' />
            )
                : <Skeleton className='w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-md' />}
            <p className='text-sm text-muted-foreground text-center'>{element.caption}</p>
        </div>
    );
}

export default function LessonContentRenderer({ elements, assetUrls, locale }: LessonContentRendererProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return (
        <div className="flex flex-col justify-start items-start gap-6">
            {elements.map((element, index) => {
                switch (element.type) {
                    case ContentElementType.PARAGRAPH:
                        return renderParagraph(element as ParagraphElement, index);

                    case ContentElementType.SECTION_TITLE:
                        return renderSectionTitle(element as SectionTitleElement, index);

                    case ContentElementType.IMAGE:
                        return renderImage(element as ImageElement, index < assetUrls.length ? assetUrls[index] : undefined, index);

                    case ContentElementType.EQUATION:
                        return renderEquation(element as EquationElement, index);

                    case ContentElementType.INTERACTIVE:
                        return renderInteractive(element as InteractiveElement,
                            index < assetUrls.length ? assetUrls[index] : undefined,
                            locale,
                            isDesktop ? 400 : 250,
                            index
                        );
                        
                    default:
                        return null;
                }
            })}
        </div>
    );
}