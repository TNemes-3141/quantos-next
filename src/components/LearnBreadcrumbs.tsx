import Link from "next/link";
import { LocalizedProps } from "@/i18n";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/shadcn-ui/breadcrumb";


type LearnBreadcrumbsProps = LocalizedProps & {
    items: {
        title: string,
        path: string,
    }[],
}

export default function LearnBreadcrumbs(props: LearnBreadcrumbsProps) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={`/${props.locale}/home/learn`}>{props.translate("home.tabLearn")}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {props.items.map((item, index) => {
                    if (index < props.items.length - 1) {
                        return (<>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`/${props.locale}/home/learn${item.path}`}>{props.items[index].title}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </>);
                    }
                    else {
                        return (<>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{props.items[index].title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>);
                    }
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}