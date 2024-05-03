import LoginOption from "@/components/LoginOption";
import { Card } from "@/components/shadcn-ui/card";

import { ValidLocale, getTranslator } from "@/i18n";

type AuthOptionsParams = {
    locale: string,
}

export default async function AuthOptions(params: AuthOptionsParams) {
    const translate = await getTranslator(
        `${params.locale}` as ValidLocale // our middleware ensures this is valid
      );

    return (
        <Card className="max-w-lg w-full space-y-12 p-10">
        <LoginOption
          optionText={translate("home.authSignUpDescription")}
          buttonText={translate("home.authSignUpButtonLabel")}
          target="/"
        />
        <LoginOption
          optionText={translate("home.authLogInDescription")}
          buttonText={translate("home.authLogInButtonLabel")}
          target="/"
        />
        <LoginOption
          optionText={translate("home.authGroupAccessDescription")}
          buttonText={translate("home.authGroupAccessButtonLabel")}
          target="/"
        />
      </Card>
    );
}