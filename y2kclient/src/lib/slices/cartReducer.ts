import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Product from '@/helpers/Types';


  
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
        saveToCart: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload)
        }, 
    }
    
    });
    
    export const { saveToCart } = cartReducer.actions;
    
    export default cartReducer.reducer;