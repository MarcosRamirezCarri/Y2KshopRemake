import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const pantsReducer = createSlice({
    name: "pants",
    initialState:{
        pants: [],
    },
    reducers:{
        setPants: (state, action) => {
            state.pants = action.payload
        }, 
    }
    
    });
    
    export const { setPants } = pantsReducer.actions;
    
    export default pantsReducer.reducer;