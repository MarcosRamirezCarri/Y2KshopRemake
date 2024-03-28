import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const shirtsReducer = createSlice({
    name: "shirts",
    initialState:{
        shirts: [],
    },
    reducers:{
        setShirts: (state, action) => {
            state.shirts = action.payload
        }, 
    }
    
    });
    
    export const { setShirts } = shirtsReducer.actions;
    
    export default shirtsReducer.reducer;
    