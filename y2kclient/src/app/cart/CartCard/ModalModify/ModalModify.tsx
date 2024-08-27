import Product from "@/helpers/Types";

interface ModalModifyProps {
  modal: boolean;
  size: string;
  color: string;
  setModal: (modal: boolean) => void;
  Product: Product;
}

const ModalModify: React.FC<ModalModifyProps> = ({
  modal,
  setModal,
  size,
  color,
  Product,
}) => {
  return (
    <div
      onClick={() => setModal(!modal)}
      className={`
    fixed inset-0 w-[100%] flex justify-center items-center transition-colors duration-500 z-[101]
    ${modal ? "visible bg-gray-950/[0.4]" : "invisible"}
  `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex flex-row bg-Lightblue-100 rounded gap-6 transition-all duration-500 p-10 w-[40%] ${
          modal ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <div className="flex flex-col">
        <p>Actual color: {color}</p>
        </div>
        <div className="flex flex-col">
        <p>Actual Size: {size}</p>
        </div>
     
       
      </div>
    </div>
  );
};

export default ModalModify;
