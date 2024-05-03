
import Link from "next/link";
import { Button } from "./shadcn-ui/button"

type LoginOptionProps = {
    optionText: string,
    buttonText: string,
    target: string,
}

export default function LoginOption(props: LoginOptionProps) {
    return (
        <div className="flex flex-col gap-6 md:flex-row md:justify-between items-center w-full">
            <p className="text-center md:text-left">{props.optionText}</p>
            <Link href={props.target}>
                <Button>{props.buttonText}</Button>
            </Link>
        </div>
    );
}