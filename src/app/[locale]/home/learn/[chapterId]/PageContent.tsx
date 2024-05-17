import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/shadcn-ui/carousel"
import { Separator } from "@/components/shadcn-ui/separator";
import LessonCard from "@/components/LessonCard";

import { LocalizedProps } from "@/i18n";
import { cn } from "@/lib/utils";
import { secondary_font } from "@/lib/fonts";
import useMediaQuery from "@/lib/useMediaQuery";
import { getLessonCardData } from "./getLessons";


type PageContentProps = LocalizedProps & {
    chapterId: string,
}

export default async function PageContent(props: PageContentProps) {
    const lessons = await getLessonCardData(props.chapterId);

    return (
        <div className="flex flex-col space-y-6">
            <p className={cn("text-2xl mt-5", secondary_font.className)}>
                {props.translate("learn.subheadingLessons")}
            </p>
            <Separator/>
            <Carousel className="xl:w-full xl:max-w-4xl mx-auto">
                <CarouselContent className="-ml-4">
                    {lessons.map((lesson, index) => (
                        <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <LessonCard
                                    lessonId={lesson.id}
                                    index={index + 1}
                                    title={lesson.title}
                                    readTime={lesson.readTime}
                                    translate={props.translate}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    );
}