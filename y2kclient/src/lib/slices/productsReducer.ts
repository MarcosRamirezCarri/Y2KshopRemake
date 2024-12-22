import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/helpers/types/Types";

interface ProductState {
  isLoading: boolean;
  status: string;
  product: Product[];
  sortProducts: Product[];
  selectedCategory: string;
  selectedSize: string;
}

const initialState: ProductState = {
  isLoading: false,
  status: "",
  product: [],
  sortProducts: [],
  selectedCategory: "all",
  selectedSize: "all",
};

export const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
      state.sortProducts = action.payload;
    },
    deleteProd: (state, action: PayloadAction<number>) => {
      state.product = state.product.filter(
        (prod) => prod.id !== action.payload
      );
    },
    modifyProduct: (state, action: PayloadAction<Product>) => {
      const index = state.product.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.product[index] = action.payload;
      }
    },
    setSearch: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
    },
    sortByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      // Aplica los filtros combinados
      state.product = state.sortProducts.filter((item) => {
        const matchesCategory =
          action.payload === "all" || item.clasification === action.payload;
        const matchesSize =
          state.selectedSize === "all" ||
          item.colors.some((color) =>
            color.sizes.some((size) => size.size === state.selectedSize)
          );
        return matchesCategory && matchesSize;
      });
    },
    sortBySize: (state, action: PayloadAction<string>) => {
      state.selectedSize = action.payload;
      // Aplica los filtros combinados
      state.product = state.sortProducts.filter((item) => {
        const matchesCategory =
          state.selectedCategory === "all" ||
          item.clasification === state.selectedCategory;
        const matchesSize =
          action.payload === "all" ||
          item.colors.some((color) =>
            color.sizes.some((size) => size.size === action.payload)
          );
        return matchesCategory && matchesSize;
      });
    },
  },
});

export const {
  setProducts,
  sortByCategory,
  modifyProduct,
  sortBySize,
  setSearch,
  deleteProd,
} = productsReducer.actions;

export default productsReducer.reducer;