import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "@/helpers/Types";

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  color: string;
  size: string;
  state: string;
  Product: Product;
}

interface CartState {
  isLoading: boolean;
  status: string;
  cart: CartItem[];
}

const initialState: CartState = {
  isLoading: false,
  status: "",
  cart: [],
};

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart = action.payload;
    },
    deleteFromCart:(state, action: PayloadAction<number>) =>{
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    logOutCart: (state) => {
      state.cart = [];
    },
  },
});

export const { saveToCart, logOutCart, deleteFromCart } = cartReducer.actions;

export default cartReducer.reducer;
