import Bonaire from "@/components/pages/Bonaire";
import { Locale } from "@/types/utils";

const page = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  return <Bonaire lang={lang} />;
};

export default page;
