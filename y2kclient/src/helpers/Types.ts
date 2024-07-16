interface Size {
    size: string;
    quantity: number;
  }
  
 export default interface Color {
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

 export default interface AccountType {
    id: number;
    password: string;
    name: string;
    email: string;  
    phone: string;
    admin: boolean | null;
  }