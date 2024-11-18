interface Size {
    size: string;
    quantity: number;
  }
  
 interface Color {
    color: string;
    sizes: Size[];
  }

  

 export interface History{
    name: string;
    color: string;
    size: string;
    images: string[];
    productId: number;
    quantity: number;
    state: string
    itemId: number
  }
  
 export default interface Product  {
    id: number;
    name: string;
    images: string[];
    price: number;
    colors: Color[];
    clasification: string;
    description: string;
  }

  export interface AccountType{
    id: number;
    password: string;
    name: string;
    history: History[];
    email: string;
    phone: string;
    admin: boolean;
  }
  export interface CartItem{
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    color: string;
    size: string;
    state: string;
    Product: Product;
  }
