import Link from "next/link";
import { LocalizedProps } from "@/i18n";

import LogInForm from "./forms/LogInForm";
import {
    Card,
    CardFooter,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/shadcn-ui/card"


export default function LogInCard(props: LocalizedProps) {
    return (
        <Card className="max-w-[350px] w-full">
            <CardHeader>
                <CardTitle>{props.translate("auth.login.title")}</CardTitle>
                <CardDescription>
                    {props.translate("auth.login.signUpHint")}&nbsp;
                    <Link href="/auth/signUp" className="underline">{props.translate("auth.signUpButtonLabel")}</Link>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LogInForm
                    emailLabel={props.translate("auth.emailLabel")}
                    passwordLabel={props.translate("auth.passwordLabel")}
                    showPasswordTooltip={props.translate("auth.showPasswordTooltip")}
                    hidePasswordTooltip={props.translate("auth.hidePasswordTooltip")}
                    submitLabel={props.translate("auth.logInButtonLabel")}
                />
            </CardContent>
            <CardFooter>
                <Link href="/" className="underline">{props.translate("auth.login.forgotPassword")}</Link>
            </CardFooter>
        </Card>
    );
}