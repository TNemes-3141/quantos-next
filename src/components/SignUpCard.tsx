import Link from "next/link";
import { LocalizedProps } from "@/i18n";

import SignUpForm from "./forms/SignUpForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/shadcn-ui/card"


export default function SignUpCard(props: LocalizedProps) {
    return (
        <Card className="max-w-[350px] w-full">
            <CardHeader>
                <CardTitle>{props.translate("auth.signup.title")}</CardTitle>
                <CardDescription>
                    {props.translate("auth.signup.logInHint")}&nbsp;
                    <Link href="/login" className="underline">{props.translate("auth.logInButtonLabel")}</Link>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm
                    emailLabel={props.translate("auth.emailLabel")}
                    passwordLabel={props.translate("auth.passwordLabel")}
                    passwordConfirmLabel={props.translate("auth.passwordConfirmLabel")}
                    passwordDescription={props.translate("auth.passwordDescription")}
                    showPasswordTooltip={props.translate("auth.showPasswordTooltip")}
                    hidePasswordTooltip={props.translate("auth.hidePasswordTooltip")}
                    submitLabel={props.translate("auth.signUpButtonLabel")}
                />
            </CardContent>
        </Card>
    );
}