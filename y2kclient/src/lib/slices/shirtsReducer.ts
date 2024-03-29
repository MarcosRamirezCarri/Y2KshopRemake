import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface shirts{
    id: number,
    title: string,
    price: number,

}

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
    