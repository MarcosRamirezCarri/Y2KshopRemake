import { createSlice } from '@reduxjs/toolkit';

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
    }
    
    });
    export const { setShirts } = shirtsReducer.actions;;
    
    export default shirtsReducer.reducer;
    