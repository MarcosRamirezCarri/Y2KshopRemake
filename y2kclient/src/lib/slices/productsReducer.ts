import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sizes: string[];
}

interface ProductState {
  isLoading: boolean;
  status: string;
  product: Product[];
  sortProducts: Product[];
  selectedCategory: string
}

const initialState: ProductState = {
  isLoading: false,
  status: "",
  product: [],
  sortProducts: [],
  selectedCategory: 'all'
};

export const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    setShirts: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
      state.sortProducts = action.payload 
    },
    sortByCategory: (state, action: PayloadAction<string>) =>{
      let copyState = [...state.sortProducts]
      state.selectedCategory = action.payload;
      if (action.payload === 'all') {
        state.product = copyState;
      } else {
        state.product = state.sortProducts.filter(item => item.category === action.payload);
      }
    }
  },
});
    export const { setShirts, sortByCategory } = productsReducer.actions;;
    
    export default productsReducer.reducer;
    