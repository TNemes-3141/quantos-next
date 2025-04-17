"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./shadcn-ui/button";
import { Loader2 } from "lucide-react";

import { anonymousSignIn } from "@/app/[locale]/auth/trial/actions";
import { ValidLocale } from "@/i18n";

type TrialLoginProps = {
    buttonText: string,
    locale: ValidLocale
}

export default function TrialLogin(props: TrialLoginProps) {
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        await anonymousSignIn(props.locale);

        setLoading(false);
    }

    return <div className="w-full flex justify-center">
        <Button onClick={onSubmit} disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <></>}
            {props.buttonText}
        </Button>
    </div>
}