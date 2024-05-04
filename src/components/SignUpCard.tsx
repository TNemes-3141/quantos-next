import Link from "next/link";
import { LocalizedProps } from "@/i18n";

import SignUpForm from "./forms/SignUpForm";
import { Button } from "@/components/shadcn-ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/shadcn-ui/card"


export default function SignUpCard(props: LocalizedProps) {
    return (
        <Card className="max-w-[350px] w-full">
            <CardHeader>
                <CardTitle>{props.translate("signup.title")}</CardTitle>
                <CardDescription>
                    {props.translate("signup.logInHint")}&nbsp;
                    <Link href="/login" className="underline">{props.translate("home.authLogInButtonLabel")}</Link>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm
                    emailLabel={props.translate("signup.emailLabel")}
                    passwordLabel={props.translate("signup.passwordLabel")}
                    passwordConfirmLabel={props.translate("signup.passwordConfirmLabel")}
                    showPasswordTooltip={props.translate("signup.showPasswordTooltip")}
                    hidePasswordTooltip={props.translate("signup.hidePasswordTooltip")}
                />
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>{props.translate("home.authSignUpButtonLabel")}</Button>
            </CardFooter>
        </Card>
    );
}