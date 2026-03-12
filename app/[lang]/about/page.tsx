import AboutUs from "@/components/pages/AboutUs";
import { Locale } from "@/types/utils";

const page = async ({ params }: { params: Promise<{ lang: Locale }> }) => {
  const { lang } = await params;
  return <AboutUs lang={lang} />;
};

export default page;
