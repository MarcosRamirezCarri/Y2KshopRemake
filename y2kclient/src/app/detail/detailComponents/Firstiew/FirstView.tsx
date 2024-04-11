interface DetailProducts {
    id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  }

const FirstView: React.FC<DetailProducts> = ({id, title, price, image, description, category}) => {
    return (
      <div className="">
        
        <p>{title}</p>
   
      </div>
    );
  };

export default FirstView;