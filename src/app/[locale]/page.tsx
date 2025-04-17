import AnimatedLogo from "@/components/AnimatedLogo";
import AuthOptions from "@/components/AuthOptions";
import TryForFree from "@/components/TryForFree";

import Footer from "@/components/layout/Footer";

import { ValidLocale, getTranslator } from "@/i18n";

export default async function Home({
  params,
}: {
  params: { locale: string; };
}) {
  const validLocale = params.locale as ValidLocale
  const translate = await getTranslator(validLocale);

  return (
    <>
      <main className="flex flex-col items-center justify-center p-12 sm:p-16 w-full space-y-12">
        <AnimatedLogo size={300} />
        <TryForFree locale={validLocale} translate={translate} />
        <AuthOptions locale={validLocale} translate={translate} />
      </main>
      <Footer locale={validLocale} translate={translate}/>
    </>
  );
}
