import { HomePage } from "@/components/pages/Home";
import { Locale } from "@/types/utils";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;

  return <HomePage lang={lang} />;
}
