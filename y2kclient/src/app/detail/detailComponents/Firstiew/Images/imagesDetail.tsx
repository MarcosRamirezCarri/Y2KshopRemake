import Image from "next/image";

interface ImagesDetailProps {
  setStateImg: (arg: string[]) => void; 
  stateImg: string[]; 
}

const ImagesDetail: React.FC<ImagesDetailProps> = ({ stateImg, setStateImg }) => {
  const handleImageClick = (index: number) => {
    setStateImg((prevState: any) => {
      const currentImages = [...prevState];
      const clickedImage = currentImages[index];


      [currentImages[0], currentImages[index]] = [
        currentImages[index],
        currentImages[0],
      ];

      return currentImages; 
    });
  };

  const renderImages = () =>
    stateImg
      .slice(1) 
      .map((img, index) => (
        <Image
          key={index + 1} 
          src={img}
          alt="Product image"
          onClick={() => handleImageClick(index + 1)} 
          className="cursor-pointer rounded w-[7.25rem] lg:w-[9.25rem] h-[7.25rem] lg:h-[9.25rem] ring-2 ring-pink-300 bg-transparent transition-all duration-150 hover:ring-pink-500"
          width={480}
          height={400}
        />
      ));

  return (
    <div className="col-span-1 flex flex-col items-center gap-5 relative top-5">
      {renderImages()}
    </div>
  );
};

export default ImagesDetail;