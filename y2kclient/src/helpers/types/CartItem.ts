import { Product } from "./Types";

export interface CartItem{
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    color: string;
    size: string;
    state: string;
    Product: Product;
    lastUpdate: string;
  }
