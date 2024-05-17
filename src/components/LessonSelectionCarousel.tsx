"useClient";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/shadcn-ui/carousel"
import LessonCard from "@/components/LessonCard";

import useMediaQuery from "@/lib/useMediaQuery";
import { LessonCardData } from "@/app/[locale]/home/learn/[chapterId]/getLessons";


type LessonSelectionCarouselProps = {
    lessons: LessonCardData[],
    readTimeLabel: string,
}

export default function LessonSelectionCarousel(props: LessonSelectionCarouselProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)"); //TODO: Replace with breakpoint for large

    return (
        <Carousel className="xl:w-full xl:max-w-4xl mx-auto" orientation={isDesktop ? "horizontal" : "vertical"}>
            <CarouselContent className="-ml-4">
                {props.lessons.map((lesson, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <LessonCard
                                lessonId={lesson.id}
                                index={index + 1}
                                title={lesson.title}
                                readTimeLabel={props.readTimeLabel.replace("{{ readTime }}", `${lesson.readTime}`)}
                                isSquare={isDesktop}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}