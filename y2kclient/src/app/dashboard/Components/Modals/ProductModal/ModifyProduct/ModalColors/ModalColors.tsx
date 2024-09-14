interface ModalColorsProps {
  setStateModal: (arg: boolean) => void;
  stateModal: string;
}

const ModalColors: React.FC<ModalColorsProps> = ({
  stateModal,
  setStateModal,
}) => {
  return (
    <div
      className={`${
        stateModal ? "visible" : "invisible"
      } justify-center bg-gray-900/[0.4] z-[105] fixed inset-0 flex `}
    >
      <div
        className={`w-[60%] font-titilium bg-Lightblue-200 gap-2 justify-center transition-all duration-250 grid grid-cols-2 p-6 rounded-lg shadow-lg transition-all duration-150 ${
          stateModal ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      ></div>
    </div>
  );
};
