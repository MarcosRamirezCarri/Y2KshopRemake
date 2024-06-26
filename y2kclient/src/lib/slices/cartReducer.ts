import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    sizes: string[]
  }
  
  interface ProductState {
    isLoading: boolean;
    status: string;
    products: Product[];
  }
  
  const initialState: ProductState = {
    isLoading: false,
    status: "",
    products: [],
  };


export const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers:{
        saveToCart: (state, action: PayloadAction<Product[]>) => {
            state.products.push(action.payload)
        }, 
    }
    
    });
    
    export const { saveToCart } = cartReducer.actions;
    
    export default cartReducer.reducer;