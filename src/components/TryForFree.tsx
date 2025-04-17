import Link from "next/link";
import { Button } from "./shadcn-ui/button"
import { Card } from "@/components/shadcn-ui/card";
import TrialLogin from "./TrialLogin";

import { LocalizedProps } from "@/i18n";

export default async function TryForFree(props: LocalizedProps) {

  return (
    <Card className="max-w-lg w-full flex flex-col space-y-6 p-10">
      <p className="text-center">{props.translate("auth.trialDescription")}</p>
      <TrialLogin buttonText={props.translate("auth.trialButtonLabel")} locale={props.locale}/>
    </Card>
  );
}