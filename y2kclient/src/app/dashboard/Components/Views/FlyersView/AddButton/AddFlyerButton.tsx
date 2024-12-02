import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/helpers/cloudinarySet";

const AddFlyerButton = () => {
  const [flyers, setFlyers] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      const imageUrl: string = await uploadImage(e.target.files[0]);
      setUploading(false);

      if (imageUrl) {
        setFlyers([...flyers, imageUrl]);
      } else {
        setError("Failed to upload image");
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...flyers];
    newImages.splice(index, 1);
    setFlyers(newImages);
  };

  return <div>
     <label className="w-[50%] bg-Lightblue-400 flex flex-col items-center py-2 cursor-pointer m-2 font-titilium text-lg rounded ring-2 ring-Lightblue-500 hover:ring-Lightblue-700 active:bg-Lightblue-500 transition-all delay-50">
            <p>Upload Image</p>
            <input
              type="file"
              className="w-full hidden"
              onChange={handleFileChange}
            />
          </label>

          {uploading && <p>Uploading...</p>}
          {error && (
            <p className="text-pink-950 font-titilium text-sm">
              {error}
            </p>
          )}
          <div className="flex flex-row gap-3">
            {flyers.map((image, index) => (
              <div
                key={index}
                className="relative p-1 bg-Lightblue-400 ring-2 ring-Lightblue-500 flex flex-col hover:scale-105 transition-all duration-200 hover:ring-pink-950 rounded"
              >
                <Image
                  width={400}
                  height={400}
                  src={image}
                  alt="Uploaded"
                  className="w-20 h-20 object-cover mb-2"
                />
                <button
                  type="button"
                  className="absolute rounded flex bottom-0 text-xl self-center bg-Lightblue-400 text-white rounded-full px-1 hover:text-pink-950 hover:scale-105 transition-all duration-150"
                  onClick={() => handleRemoveImage(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>


  </div>;
};

export default AddFlyerButton;