import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import deleteCartItem from "@/lib/actions/CartActions/deleteCart";
import Product from "@/helpers/Types";

interface CartProduct  {
  productId: number;
  id: number;
  quantity: number;
  color: string;
  size: string;
  userId: number;
  Product: Product;
};

const CartCard: React.FC<CartProduct> = ({
  productId,
  id,
  color,
  size,
  Product,
  userId
}) => {
  const dispatch = useAppDispatch()
  const route = useRouter();


  const handleModify = () =>{
    Swal.fire({
      title: "Do you want Modify this product from your cart?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Modify",
      denyButtonText: "Don't Modify",
    }).then((result) => {
      if (result.isConfirmed) {
      
        dispatch(deleteCartItem(userId, id))
        
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }
  const handleDelete = () =>{
      Swal.fire({
        title: "Do you want delete this product from your cart?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: "Don't save",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "", "success");
          dispatch(deleteCartItem(userId, id))
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    
    
  }
  return (
    <div className="grid grid-cols-6 p-5 w-[100%] rounded-md gap-[1rem] bg-Lightblue-100 border-2 border-Lightblue-800">
      <div className="col-span-2">
        <Image
          width={680}
          height={680}
          src={Product.images[0]}
          className="rounded w-[10.25rem] ring-2 ring-Lightblue-200 h-[10.25rem] bg-transparent"
          alt="no image"
        />
      </div>
      <div className="col-span-4 lg:col-span-2 flex flex-col gap-3">
        <p className="font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
          {Product.name}
        </p>
        <p className="font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
          {Product.clasification}
        </p>
        <p className="font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
          {color}, {size}
        </p>
        <p className="font-tiltneon text-md lg:text-xl text-Lightblue-950 font-semibold">
          ${Product.price}
        </p>
        <div className="flex flex-row gap-2 lg:hidden">
        <button className="relative self-end bg-pink-300 px-2  py-1 rounded-[1.25rem] font-tiltneon text-md text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
          Buy
        </button>
        <button onClick={handleDelete} className="relative self-end bg-pink-300 px-2  py-1 rounded-[1.25rem] font-tiltneon text-md text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
        Discard
        </button>
        <button onClick={handleModify} className="relative self-end bg-pink-300 px-2  py-1 rounded-[1.25rem] font-tiltneon text-md text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
         Modify
        </button>
        </div>
        
      </div>

      <div className="lg:col-span-2  gap-3 hidden lg:flex lg:flex-col">
        <button className="relative bg-pink-300 px-4 py-2 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
          Buy
        </button>
        <button onClick={handleDelete} className="relative bg-pink-300 px-4 py-2 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
          Discard
        </button>
        <button onClick={handleModify} className="relative bg-pink-300 px-4 py-2 rounded-[1.25rem] font-tiltneon text-lg lg:text-xl text-pink-950 font-normal transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-pink-200">
          Modify
        </button>
      </div>
    </div>
  );
};

export default CartCard;
