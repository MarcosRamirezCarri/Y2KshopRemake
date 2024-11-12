import Image from "next/image";
import { History } from "@/helpers/Types";



const CardHistory: React.FC<History> = ({
  name, color, size, images, productId, quantity, state
}) => {
  return (
<div className="bg-Lightblue-200 ring-2 ring-Lightblue-400 rounded-md grid grid-cols-3">
    <div>
      <Image className="rounded w-[10.25rem] ring-2 ring-Lightblue-200 h-[10.25rem] bg-transparent" />
    </div>
    <div>

    </div>
    <div>
        
    </div>
  </div>
  )
  
};

export default CardHistory;
