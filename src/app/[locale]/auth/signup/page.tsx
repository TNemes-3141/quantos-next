import SignUpCard from "@/components/SignUpCard";
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
      <main className="flex items-center justify-center p-12 sm:p-16 w-full">
        <SignUpCard locale={validLocale} translate={translate}/>
      </main>
      <Footer locale={validLocale} translate={translate} />
    </>
  );
}
