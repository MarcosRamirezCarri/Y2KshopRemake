import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Product from "@/helpers/Types";

interface ProductState {
  isLoading: boolean;
  status: string;
  product: Product[];
  sortProducts: Product[];
  selectedCategory: string;
}

const initialState: ProductState = {
  isLoading: false,
  status: "",
  product: [],
  sortProducts: [],
  selectedCategory: "all",
};

export const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    setShirts: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
      state.sortProducts = action.payload;
    },
    deleteProd: (state, action: PayloadAction<number>) => {
      state.product = state.product.filter(
        (prod) => prod.id !== action.payload
      );
    },
    setSearch: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
    },
    sortByCategory: (state, action: PayloadAction<string>) => {
      let copyState = [...state.sortProducts];
      state.selectedCategory = action.payload;
      if (action.payload === "all") {
        state.product = copyState;
      } else {
        state.product = state.sortProducts.filter(
          (item) => item.clasification === action.payload
        );
      }
    },
    sortBySize: (state, action: PayloadAction<string>) => {
      let copyState = [...state.sortProducts];
      state.selectedCategory = action.payload;
      if (action.payload === "all") {
        state.product = copyState;
      } else {
        state.product = state.sortProducts.filter((item) =>
          item.colors.some((color) =>
            color.sizes.some((size) => size.size === action.payload)
          )
        );
      }
    },
  },
});
export const { setShirts, sortByCategory, sortBySize, setSearch, deleteProd } =
  productsReducer.actions;

export default productsReducer.reducer;
