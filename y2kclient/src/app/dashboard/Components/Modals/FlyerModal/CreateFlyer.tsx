import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/helpers/services/cloudinarySet";
import { FlyerType } from "@/helpers/types/FlyerType";

interface CreateFlyerProps {
  state: boolean;
  setState: (arg: boolean) => void;
}

const CreateFlyer: React.FC<CreateFlyerProps> = ({ state, setState }) => {
  const [flyers, setFlyers] = useState<FlyerType>({
    image: "",
    name: "",
    id: 0,
    type: "",
    status: true,
  });
  const [error, setError] = useState({
    name: "",
    type: "",
    image: ""
  });

  const [uploading, setUploading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFlyers({ ...flyers, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      const imageUrl: string = await uploadImage(e.target.files[0]);
      setUploading(false);

      if (imageUrl) {
        setFlyers({ ...flyers, image: imageUrl });
      } else {
        setError({...error, image:"Failed to upload image"});
      }
    }
  };

  const handleRemoveImage = () => {
    const newImages = {...flyers};
    newImages.image = "";
    setFlyers(newImages);
  };
  return (
    <div
      onClick={() => setState(!state)}
      className={`fixed inset-0 flex z-[101] items-center  justify-center bg-gray-900/[0.4] ${
        state ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`font-titilium bg-Lightblue-200 gap-2 justify-center transition-all duration-250 flex flex-col p-6 rounded-lg shadow-lg transition-all duration-300 ${
          state ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <label className="w-[50%] bg-Lightblue-400 flex flex-col items-center py-2 cursor-pointer m-2 font-titilium text-lg rounded ring-2 ring-Lightblue-500 hover:ring-Lightblue-700 active:bg-Lightblue-500 transition-all delay-50">
          <p>Upload Image</p>
          <input
            type="file"
            className="w-full hidden"
            onChange={handleFileChange}
          />
        </label>

        {uploading && <p>Uploading...</p>}
        {error.image && (
          <p className="text-pink-950 font-titilium text-sm">{error.image}</p>
        )}
        <div className="flex flex-row gap-3">
        
            <div
              className={`${flyers.image.length > 3 ? 'visible' : 'invisible'} relative p-1 bg-Lightblue-400 ring-2 ring-Lightblue-500 flex flex-col hover:scale-105 transition-all duration-200 hover:ring-pink-950 rounded`}
            >
              <Image
                width={400}
                height={400}
                src={flyers.image}
                alt="Uploaded"
                className="w-20 h-20 object-cover mb-2"
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
        <div className="text-Lightblue-950 flex justify-between flex-row font-titilium text-lg">
          <p>Name:</p>
  
          {error.name && <p className="text-pink-950 self-end text-sm">{error.name}</p>}
        </div>
        <input
            className={`w-full p-2 border ${
              error ? "border-pink-950" : "border-Lightblue-300"
            } rounded focus:outline-Lightblue-400`}
            type="text"
            name='name'
            value={flyers.name}
            onChange={handleChange}
          />
        </div>
        
        </div>
        
      </div>
      ;
    </div>
  );
};

export default CreateFlyer;
