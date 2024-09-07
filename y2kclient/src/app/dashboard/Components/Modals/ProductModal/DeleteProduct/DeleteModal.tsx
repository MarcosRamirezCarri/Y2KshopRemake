import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";


interface DeleteModalProps {
    setStateAdmin: (arg: string) => void;
    stateAdmin: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({setStateAdmin, stateAdmin}) =>{
    return(
        <div className={`fixed inset-0 flex z-[101] items-center  justify-center bg-gray-900/[0.4] ${
            stateAdmin === "CreateProduct" ? "visible" : "invisible"
          }`}>
            <div className={`w-[60%] bg-Lightblue-200 gap-2 justify-center transition-all duration-250   grid grid-cols-2 p-6 rounded-lg shadow-lg transition-all duration-150 ${
          stateAdmin === "CreateProduct"
            ? "scale-100 opacity-100"
            : "scale-125 opacity-0"
        }`}>

            </div>

        </div>
    )
}