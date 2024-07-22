import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "@/helpers/Types";

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  color: string;
  size: string;
  Product: Product;
}

interface ProductState {
  isLoading: boolean;
  status: string;
  products: CartItem[];
}

const initialState: ProductState = {
  isLoading: false,
  status: "",
  products: [],
};

export const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveToCart: (state, action: PayloadAction<CartItem>) => {
      state.products = action.payload;
    },
    logOutCart: (state) => {
      state.products = [];
    },
  },
});

export const { saveToCart, logOutCart } = cartReducer.actions;

export default cartReducer.reducer;
