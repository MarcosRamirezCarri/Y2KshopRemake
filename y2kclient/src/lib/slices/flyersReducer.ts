import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlyerType } from "@/helpers/types/FlyerType";

interface FlyerState{
    allFlyers: FlyerType[];
}

const initialState: FlyerState = {
allFlyers: []
}

export const flyersReducer  = createSlice({
    name: "flyers",
    initialState,
    reducers:{
        getAllFlyers: (state, action: PayloadAction<FlyerType[]>) =>{
            state.allFlyers = action.payload

        }
    }

});

export const { getAllFlyers} = flyersReducer.actions;

export default flyersReducer.reducer;
