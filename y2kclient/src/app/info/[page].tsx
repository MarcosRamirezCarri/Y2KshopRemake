import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

type PageProps = {
  title: string;
  content: string;
};

const StaticPage: React.FC<PageProps> = ({ title, content }) => {
  const router = useRouter();

  // Display a loading state if the page is not yet generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-lg">{content}</p>
    </div>
  );
};

export default StaticPage;

// Data for the pages
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

// Generate paths for the dynamic pages
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = Object.keys(pagesData).map((page) => ({
      params: { page },
    }));
    return { paths, fallback: false };
  };

// Fetch the content for the current page
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = params?.page as string;
  const pageData = pagesData[page];

  if (!pageData) {
    return { notFound: true }; // Return a 404 if the page doesn't exist
  }

  return {
    props: pageData,
  };
};