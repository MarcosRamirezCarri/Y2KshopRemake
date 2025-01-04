import { Metadata } from "next";
import Navbar from "@/app/[locale]/Components/NavBar/NavBar";

type PageProps = {
  params: { page: string };
};

const pagesData = {
  faq: {
    title: "Frequently Asked Questions",
    content: "Here you'll find answers to the most common questions about our store and services.",
  },
  about_us: {
    title: "About Us",
    content: "We are RetroFuture Threads, a store committed to bringing Y2K fashion back to life.",
  },
  policy: {
    title: "Privacy Policy",
    content: "We value your privacy and are committed to protecting your personal information.",
  },
};

// Metadata opcional para SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
    <div className="flex flex-col w-full h-full items-center">
      <Navbar/>
      <div className="flex relative flex-col items-center top-[7.5rem]">
      <h1 className="text-3xl font-bold mb-4">{pageData.title}</h1>
      <p className="text-lg">{pageData.content}</p>
      </div>
  
    </div>
  );
};

export default StaticPage;