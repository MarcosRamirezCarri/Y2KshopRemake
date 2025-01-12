import { Metadata } from "next";
import ProductsControl from "../Components/Views/ProductsView/ProductsMetrics";
import FlyersConfig from "../Components/Views/FlyersView/FlyersConfig";
import UsersTable from "../Components/Views/UsersViews/UsersTable";
import TaskList from "../Components/Views/TasksViews/TaskList";


type PageKey = "users" | "products" | "tasks" | "flyers";

type PageProps = {
  params: { page: PageKey };
};


const pagesData: Record<PageKey, { component: React.FC; title: string }> = {
  users: { component: UsersTable, title: "Users Management" },
  products: { component: ProductsControl, title: "Products Management" },
  tasks: { component: TaskList, title: "Tasks List" },
  flyers: { component: FlyersConfig, title: "Flyers Configuration" },
};


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pageData = pagesData[params.page];
  return {
    title: pageData?.title || "Page Not Found",
  };
}


export async function generateStaticParams() {
  return Object.keys(pagesData).map((page) => ({ page }));
}

const StaticPageDash = ({ params }: PageProps) => {
  const pageData = pagesData[params.page];

  if (!pageData) {
    return <div>Page Not Found</div>;
  }

  const PageComponent = pageData.component;

  return (
    <div className="flex flex-col items-center">
      <PageComponent />
    </div>
  );
};

export default StaticPageDash;