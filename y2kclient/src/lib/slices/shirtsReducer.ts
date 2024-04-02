import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Shirts{
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,

}


export const fetchData = createAsyncThunk(
    'data/fetchData',
    async (apiUrl: string) => {
      const response = await axios.get<Shirts>(apiUrl);
      return response.data;
    }
  );

export const shirtsReducer = createSlice({
    name: "shirts",
    initialState:{
        shirts: [],
        loading: false,
        error: null,
    },
    reducers:{
       
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchData.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.shirts = action.payload

          })
          .addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
          });
      },
    
    });
    
    export const { reducer } = shirtsReducer;
    
    export default shirtsReducer.reducer;
    