import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/helpers/Types";



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
    saveToCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;
    },
    deleteFromCart:(state, action: PayloadAction<number>) =>{
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    modifyCartItem: (state, action: PayloadAction<CartItem>) =>{
      const index = state.cart.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.cart[index] = action.payload;
      }
    },
    logOutCart: (state) => {
      state.cart = [];
    },
  },
});

export const {modifyCartItem, saveToCart, logOutCart, deleteFromCart } = cartReducer.actions;

export default cartReducer.reducer;
