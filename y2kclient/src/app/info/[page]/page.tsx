import { Metadata } from "next";
import Navbar from "@/app/components/layout/NavBar/NavBar";
import Footer from "@/app/components/layout/Footer/Footer";
import { about_us } from "../data/aboutData";
import { faq } from "../data/faqData";
import { shipping } from "../data/shippingData";

type PageProps = {
  params: { page: string };
};

const pagesData = {
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

  return (
    <div className="flex flex-col  w-full h-full items-center">
      <Navbar />
      <div className="flex font-titilium w-[90%] text-gray-950 relative flex-col gap-4 items-center top-[7.5rem]">
        <h1 className="text-2xl font-bold mb-4">{pageData.title}</h1>
        <p
          className={`text-lg ${
            pageData.text1.length > 2 ? "visible" : "hidden"
          } `}
        >
          {pageData.text1}
        </p>
        <p
          className={`text-lg ${
            pageData.text2.length > 2 ? "visible" : "hidden"
          } `}
        >
          {pageData.text2}
        </p>
        <p
          className={`text-lg ${
            pageData.text3.length > 2 ? "visible" : "hidden"
          } `}
        >
          {pageData.text3}
        </p>
        <p
          className={`text-lg ${
            pageData.text4.length > 2 ? "visible" : "hidden"
          } `}
        >
          {pageData.text4}
        </p>
        <p
          className={`text-lg ${
            pageData.text5.length > 2 ? "visible" : "hidden"
          } `}
        >
          {pageData.text5}
        </p>
        <p
          className={`text-lg ${
            pageData.final.length > 2 ? "visible" : "hidden"
          } `}
        >
          {pageData.final}
        </p>
      </div>
    </div>
  );
};

export default StaticPage;
