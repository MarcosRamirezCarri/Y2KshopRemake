import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Shirt {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ShirtsState {
  isLoading: boolean;
  status: string;
  shirts: Shirt[];
}

const initialState: ShirtsState = {
  isLoading: false,
  status: "",
  shirts: [],
};

export const shirtsReducer = createSlice({
  name: "shirts",
  initialState,
  reducers: {
    setShirts: (state, action: PayloadAction<Shirt[]>) => {
      state.shirts = action.payload;
    },
  },
});
    export const { setShirts } = shirtsReducer.actions;;
    
    export default shirtsReducer.reducer;
    