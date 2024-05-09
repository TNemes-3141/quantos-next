import PageContent, { LocalizedStrings } from "./PageContent";
import Footer from "@/components/layout/Footer";

import { ValidLocale, getTranslator } from "@/i18n";
import { validateUser } from "@/lib/validateUser";

export default async function Home({
  params,
}: {
  params: { locale: string; };
}) {
  const user = await validateUser();

  const validLocale = params.locale as ValidLocale
  const translate = await getTranslator(validLocale);

  const localizedStrings: LocalizedStrings = {
    nextPageButton: translate("welcome.nextPageButton"),
    previousPageButton: translate("welcome.previousPageButton"),
    welcomePage: {
      title: translate("welcome.welcomePage.title"),
      question: translate("welcome.welcomePage.question")
    },
    namePage: {
      title: translate("welcome.namePage.title"),
      question: translate("welcome.namePage.question"),
      placeholder: translate("welcome.namePage.placeholder")
    },
    accountTypePage: {
      titleWithName: translate("welcome.accountTypePage.titleWithName"),
      titleWithoutName: translate("welcome.accountTypePage.titleWithoutName"),
      optionStudentTitle: translate("welcome.accountTypePage.optionStudentTitle"),
      optionStudentDescription: translate("welcome.accountTypePage.optionStudentDescription"),
      optionTeacherTitle: translate("welcome.accountTypePage.optionTeacherTitle"),
      optionTeacherDescription: translate("welcome.accountTypePage.optionTeacherDescription")
    },
    agePage: {
      title: translate("welcome.agePage.title"),
      description: translate("welcome.agePage.description"),
      optionNotSpecified: translate("welcome.agePage.optionNotSpecified"),
      optionTeen: translate("welcome.agePage.optionTeen"),
      optionYoungAdult: translate("welcome.agePage.optionYoungAdult"),
      optionAdult: translate("welcome.agePage.optionAdult"),
      optionElder: translate("welcome.agePage.optionElder")
    },
    experiencePage: {
      title: translate("welcome.experiencePage.title"),
      description: translate("welcome.experiencePage.description"),
      optionBeginner: translate("welcome.experiencePage.optionBeginner"),
      optionAdvanced: translate("welcome.experiencePage.optionAdvanced"),
      optionSkilled: translate("welcome.experiencePage.optionSkilled")
    },
    finalPage: {
      title: translate("welcome.finalPage.title")
    }
  }

  return (
    <>
      <PageContent strings={localizedStrings} />
      <Footer locale={validLocale} translate={translate} />
    </>
  );
}