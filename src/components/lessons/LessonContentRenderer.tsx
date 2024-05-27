import { LessonContentElement } from "@/lib/contentTypes"


type LessonContentRendererProps = {
    elements: LessonContentElement[],
}

export default function LessonContentRenderer(props: LessonContentRendererProps) {
    return (
        <p>This page has {props.elements.length} elements</p>
    );
}