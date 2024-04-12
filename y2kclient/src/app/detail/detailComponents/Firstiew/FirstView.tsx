import Image from "next/image";

interface DetailProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const FirstView: React.FC<DetailProducts> = ({
  id,
  title,
  price,
  image,
  description,
  category,
}) => {
  return (
    <div className="grid grid-cols-5 col-span-3 w-[100%] gap-3">
      <div className="col-span-1 flex flex-col items-center py-10 gap-5">
        <Image
          width={880}
          height={800}
          src={image}
          className="rounded w-[7.25rem] ring-2 ring-pink-200 h-[7.25rem] bg-transparent"
          alt="no image"
        />
        <Image
          width={880}
          height={800}
          src={image}
          className="rounded w-[7.25rem] ring-2 ring-pink-200 h-[7.25rem] bg-transparent"
          alt="no image"
        />
        <Image
          width={880}
          height={800}
          src={image}
          className="rounded w-[7.25rem] ring-2 ring-pink-200 h-[7.25rem] bg-transparent"
          alt="no image"
        />
      </div>
      <div className="col-span-2 flex flex-col items-center gap-3 ">
        <p className="font-tiltneon text-3xl text-blue-900 font-semibold">
          {title}
        </p>
        <Image
          width={880}
          height={800}
          src={image}
          className="rounded w-[24.25rem] ring-2 ring-pink-300 h-[24.25rem] bg-transparent"
          alt="no image"
        />
      </div>

      <div className="flex flex-col p-6 place-content-center items-left col-span-2 gap-5">
        <p className="font-tiltneon text-xl text-blue-900 font-normal flex flex-row">
          Category:{" "}
          <p className="font-tiltneon text-lg text-gray-800 text-justify font-light px-2">
            - {category}
          </p>
        </p>

        <p className="font-tiltneon text-xl text-blue-900 font-normal ">
          Description:
        </p>
        <p className="font-tiltneon text-lg text-gray-800 text-justify font-light">
          - {description}
        </p>
        <p className="font-tiltneon text-xl text-blue-900 font-normal flex flex-row">
          Price:{" "}
          <p className="font-tiltneon text-lg text-gray-800 text-justify font-light px-2">
            - ${price}
          </p>
        </p>
      </div>
    </div>
  );
};

export default FirstView;
