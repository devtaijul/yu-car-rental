import { HomePage } from "@/components/pages/Home";
import { getDictionary } from "./dictionaries/dictionaries";
import { Locale } from "@/types/utils";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  const dict = await getDictionary(lang);

  return <HomePage lang={lang} />;
}
