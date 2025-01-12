import { Metadata } from "next";
import { Product } from "@/helpers/types/Types";
import { getProductDetail } from "@/lib/actions/ProductActions/getDetail";
import FirstView from "../detailComponents/Firstiew/FirstView";
import SecondView from "../detailComponents/SecondView/SecondView";

// Metadata opcional para SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const pageTitle = `Detalle del Producto - ${params.id}`;
  return {
    title: pageTitle || "Producto no encontrado",
  };
}

type DetailProductProps = {
  params: { page: string };
};

const DetailProduct = async ({ params }: DetailProductProps) => {
  const numberId = Number(params.page);


  try {
    // Realizar la petición al servidor
    const response = await getProductDetail(numberId);

    if (!response?.success) {
      throw new Error("Error al obtener el producto");
    }

    const product: Product = response.detail;

    return (
      <div className="flex flex-col w-full">
        <div className="flex flex-col w-[90%] justify-around top-[7.5rem] relative items-center">
          {/* Pasar los datos a los componentes */}
          <FirstView product={product} />
          <SecondView classif={product.clasification}/>
        </div>
      </div>
    );
  } catch (error: any) {

    return <div>Producto no encontrado</div>;
  }
};

export default DetailProduct