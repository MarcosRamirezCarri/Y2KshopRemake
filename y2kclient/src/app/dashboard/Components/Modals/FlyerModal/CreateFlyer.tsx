import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/helpers/services/cloudinarySet";
import { useAppDispatch } from "@/lib/hooks/hooks";
import Swal from "sweetalert2";
import { createFlyer } from "@/lib/actions/AdminActions/createFlyer";
import validateFlyer from "@/helpers/validators/validateFlyers";
import { FlyerType } from "@/helpers/types/FlyerType";

interface CreateFlyerProps {
  state: boolean;
  setState: (arg: boolean) => void;
}

const CreateFlyer: React.FC<CreateFlyerProps> = ({ state, setState }) => {
  const [flyers, setFlyers] = useState<FlyerType>({
    image: "",
    name: "",
    type: "",
    text: "",
    status: true,
    id: 0,
  });
  const [error, setError] = useState({
    name: "",
    type: "",
    image: "",
    text: "",
  });

  const dispatch = useAppDispatch();

  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      const imageUrl: string = await uploadImage(e.target.files[0]);
      setUploading(false);

      if (imageUrl) {
        setFlyers({ ...flyers, image: imageUrl });
      } else {
        setError({ ...error, image: "Failed to upload image" });
      }
    }
  };

  const handleRemoveImage = () => {
    const newImages = { ...flyers };
    newImages.image = "";
    setFlyers(newImages);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (value === "text") {
      const newImages = { ...flyers };
      newImages.image = "";
      setFlyers(newImages);
    }
    setFlyers({ ...flyers, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleCreate = () => {
    const validationErrors: any = validateFlyer(flyers);

    const hasErrors: boolean = Object.values(validationErrors).some((error) => {
      if (Array.isArray(error)) {
        return error.some((subError) => subError !== "");
      }
      return error !== "";
    });
    if (hasErrors) {
      setError(validationErrors);
      return;
    } else {
      dispatch(createFlyer(flyers)).then((response: any) => {
        if (response.success) {
          console.log("se crea");
          Swal.fire(
            "Flyer Created!",
            "Enable him in the flyers section!",
            "success"
          );
          setFlyers({
            image: "",
            name: "",
            id: 0,
            type: "",
            status: true,
            text: "",
          });
          setError({
            name: "",
            type: "",
            image: "",
            text: "",
          });
          setState(!state);
        }
      });
    }
  };
  return (
    <div
      className={`fixed inset-0 flex z-[101] items-center  justify-center bg-gray-900/[0.4] ${
        state ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`font-titilium w-[30%] text-lg text-Lightblue-950 bg-Lightblue-200 gap-4 justify-center transition-all duration-250 flex flex-col p-6 rounded-lg shadow-lg transition-all duration-300 ${
          state ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <h2 className="col-span-2 flex justify-center font-titilium text-2xl font-semibold ">
          Create Flyer
        </h2>
        {error.type && (
          <p className="text-pink-950 font-titilium text-sm">{error.type}</p>
        )}
        <div className="flex flex-row gap-2">
          <p>Select Type:</p>
          <select
            className="w-1/2 p-2 border border-Lightblue-300 focus:outline-Lightblue-400 rounded mr-2"
            name="type"
            value={flyers.type}
            onChange={(e) => handleChange(e)}
          >
            <option disabled value="">Select Type</option>
            <option value="text">Text</option>
            <option value="bigFlyer">Big Flyer</option>
            <option value="smallFlyer">Small Flyer</option>
          </select>
        </div>

        <label
          className={`w-[100%]  flex flex-col items-center py-2 ${
            flyers.type !== "bigFlyer" && flyers.type !== "smallFlyer"
              ? "bg-Lightblue-300 ring-Lightblue-400 cursor-not-allowed"
              : "bg-Lightblue-400 ring-Lightblue-500 cursor-pointer hover:ring-Lightblue-700 active:bg-Lightblue-500"
          }    m-2 font-titilium text-lg rounded ring-2  transition-all delay-50`}
        >
          <p>Upload Image</p>
          <input
            type="file"
            disabled={
              flyers.type !== "bigFlyer" && flyers.type !== "smallFlyer"
            }
            className="w-full hidden"
            onChange={handleFileChange}
          />
        </label>

        {uploading && <p>Uploading...</p>}
        {error.image && (
          <p className="text-pink-950 font-titilium text-sm">{error.image}</p>
        )}
        <div
          className={`${
            flyers.image.length > 3 ? "visible" : "invisible hidden"
          } relative p-1 ${
            flyers.type === "bigFlyer" ? "w-[90%]" : "w-[50%]"
          } items-center self-center bg-Lightblue-400 ring-2 ring-Lightblue-500 flex flex-col hover:scale-105 transition-all duration-200 hover:ring-pink-950 rounded`}
        >
          <Image
            width={400}
            height={400}
            src={flyers.image}
            alt="Uploaded"
            className=" h-20 object-cover mb-2"
          />
          <button
            type="button"
            className="absolute rounded flex bottom-0 text-xl self-center bg-Lightblue-400 text-white rounded-full px-1 hover:text-pink-950 hover:scale-105 transition-all duration-150"
            onClick={() => handleRemoveImage()}
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col w-[100%]">
          <div className="flex justify-between flex-row ">
            <p>Name:</p>

            {error.name && (
              <p className="text-pink-950 self-end text-sm">{error.name}</p>
            )}
          </div>
          <input
            className={`w-full p-2 border ${
              error ? "border-pink-950" : "border-Lightblue-300"
            } rounded focus:outline-Lightblue-400`}
            type="text"
            name="name"
            value={flyers.name}
            onChange={handleChange}
          />
          <div className="flex justify-between flex-row ">
            <p>Text:</p>

            {error.text && (
              <p className="text-pink-950 self-end text-sm">{error.text}</p>
            )}
          </div>
          <textarea
            disabled={flyers.type !== "text"}
            className={`w-full mb-3 p-2 border ${
              error ? "text-pink-950 border-pink-950" : "border-Lightblue-300"
            } ${
              flyers.type !== "text"
                ? "blur-sm cursor-not-allowed"
                : "blur-none"
            } rounded focus:outline-Lightblue-400`}
            name="text"
            placeholder="Enter your text"
            value={flyers.text}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row gap-2 justify-center">
          <button
            type="button"
            className="bg-Lightblue-500 text-white rounded px-4 py-2 m-1 font-titilium ring-2 ring-Lightblue-600 transition-all duration-150 hover:ring-Lightblue-700 hover:scale-105 active:bg-Lightblue-700"
            onClick={() => handleCreate()}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white rounded px-4 py-2 m-1 font-titilium ring-2 ring-gray-600 transition-all duration-150 hover:ring-gray-700 hover:scale-105 active:bg-gray-700"
            onClick={() => setState(!state)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateFlyer;
