import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../shadcn-ui/card";


type StatCardProps = {
    title: string,
    description: string,
    children: ReactNode,
}

export default function StatCard(props: StatCardProps) {
    return (
        <Card className="max-w-[600px] h-full">
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
                <CardDescription>{props.description}</CardDescription>
            </CardHeader>
            <CardContent>
                {props.children}
            </CardContent>
        </Card>
    );
}