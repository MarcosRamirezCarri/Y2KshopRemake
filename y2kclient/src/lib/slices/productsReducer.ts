import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductState {
  isLoading: boolean;
  status: string;
  product: Product[];
  sortProducts: Product[];
}

const initialState: ProductState = {
  isLoading: false,
  status: "",
  product: [],
  sortProducts: []
};

export const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    setShirts: (state, action: PayloadAction<Product[]>) => {
      state.product = action.payload;
      state.sortProducts = action.payload 
    },
    sortByCategory: (state, action) =>{
      let sorted = action.payload === 'all' state.sortProducts : state.product.filter((el) =>
        el.category.includes(action.payload));

    }
  },
});
    export const { setShirts } = productsReducer.actions;;
    
    export default productsReducer.reducer;
    