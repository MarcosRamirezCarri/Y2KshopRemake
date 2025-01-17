import { Metadata } from "next";
import { about_us } from "../data/aboutData";
import { faq } from "../data/faqData";
import { shipping } from "../data/shippingData";

type PageKey = "faq" | "about_us" | "shipping";

type PageProps = {
  params: { page: PageKey };
};

const pagesData: Record<PageKey, { title: string; text1: string; text2: string; text3: string; text4: string; text5: string; final: string }> = {
  faq,
  about_us,
  shipping,
};

// Metadata opcional para SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const pageData = pagesData[params.page];
  return {
    title: pageData?.title || "Page Not Found",
  };
}

// Función para generar rutas dinámicas
export async function generateStaticParams() {
  return Object.keys(pagesData).map((page) => ({ page }));
}

const StaticPage = ({ params }: PageProps) => {
  const pageData = pagesData[params.page];

  if (!pageData) {
    return <div>Page Not Found</div>;
  }

  const renderText = (text: string) => (
    <p
    className={`text-lg ${
      text.length > 2 ? "visible" : "hidden"
    } `}
  >
    {text}
  </p>
  )

  return (
    <div className="flex flex-col  w-full h-full items-center">
      <div className="flex font-titilium w-[90%] text-gray-950 relative flex-col gap-4 items-center top-[7.5rem]">
        <h1 className="text-2xl font-bold mb-4">{pageData.title}</h1>
        {renderText(pageData.text1)}
        {renderText(pageData.text2)}
        {renderText(pageData.text3)}
        {renderText(pageData.text4)}
        {renderText(pageData.text5)}
        {renderText(pageData.final)}
      </div>
    </div>
  );
};

export default StaticPage;
