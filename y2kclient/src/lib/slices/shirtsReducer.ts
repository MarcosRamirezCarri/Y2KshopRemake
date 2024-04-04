import { createSlice } from '@reduxjs/toolkit';
import { getAllProducts } from '../actions/getAllProducts';




export const shirtsReducer = createSlice({
    name: "shirts",
    initialState:{
        isLoading: false,
        status: "",
        shirts: [],
    },
    reducers:{
      setShirts: (state, action) => {
        state.shirts = action.payload
    }, 
    },
    extraReducers: {
      getAllProducts.pending.type: (state, action) => {
          state.status = "pending";
          state.isLoading = true;
      },
      getEmployees.fulfilled.type: (state, { payload }) => {
          state.status = "success";
          state.values = payload;
          state.isLoading = false;
      },
      etEmployees.rejected.type: (state, action) => {
          state.status = "failed"
          state.isLoading = false
      }
    }
    
    });
    export const { setShirts } = shirtsReducer.actions;;
    
    export default shirtsReducer.reducer;
    