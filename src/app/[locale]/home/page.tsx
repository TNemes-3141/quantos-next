import Layout from "./Layout";
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

  return (
    <Layout locale={validLocale} translate={translate} userName={user.user_metadata.display_name}/>
  );
}