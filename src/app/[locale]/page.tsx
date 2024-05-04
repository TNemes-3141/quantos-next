import AnimatedLogo from "@/components/AnimatedLogo";
import AuthOptions from "@/components/AuthOptions";

import Footer from "@/components/layout/Footer";

import { ValidLocale, getTranslator } from "@/i18n";

export default async function Home({
  params,
}: {
  params: { locale: string; };
}) {
  const translate = await getTranslator(
    `${params.locale}` as ValidLocale // our middleware ensures this is valid
  );

  return (
    <>
      <main className="flex flex-col items-center justify-center p-12 sm:p-24 w-full space-y-12">
        <AnimatedLogo size={300} />
        <AuthOptions translate={translate} />
      </main>
      <Footer translate={translate}/>
    </>
  );
}
