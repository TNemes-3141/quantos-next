import LoginOption from "@/components/LoginOption";
import { Card } from "@/components/shadcn-ui/card";

import { LocalizedProps } from "@/i18n";

export default async function AuthOptions(props: LocalizedProps) {

  return (
    <Card className="max-w-lg w-full space-y-12 p-10">
      <LoginOption
        optionText={props.translate("home.authSignUpDescription")}
        buttonText={props.translate("home.authSignUpButtonLabel")}
        target="/signup"
      />
      <LoginOption
        optionText={props.translate("home.authLogInDescription")}
        buttonText={props.translate("home.authLogInButtonLabel")}
        target="/"
      />
      <LoginOption
        optionText={props.translate("home.authGroupAccessDescription")}
        buttonText={props.translate("home.authGroupAccessButtonLabel")}
        target="/"
      />
    </Card>
  );
}