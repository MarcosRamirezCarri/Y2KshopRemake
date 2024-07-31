interface Size {
    size: string;
    quantity: number;
  }
  
 interface Color {
    color: string;
    sizes: Size[];
  }
  
 export default interface Product  {
    id: number;
    name: string;
    images: string[];
    price: number;
    colors: Color[];
    clasification: string;
    description?: string;
  }

