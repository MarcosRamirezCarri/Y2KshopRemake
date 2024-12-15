import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlyerType } from "@/helpers/types/FlyerType";

interface FlyerState {
  allFlyers: FlyerType[];
}

const initialState: FlyerState = {
  allFlyers: [],
};

export const flyersReducer = createSlice({
  name: "flyers",
  initialState,
  reducers: {
    setAllFlyers: (state, action: PayloadAction<FlyerType[]>) => {
      state.allFlyers = action.payload;
    },
    modifyFlyers: (state, action: PayloadAction<FlyerType>) => {
      const index = state.allFlyers.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.allFlyers[index] = action.payload;
      }
    },
  },
});

export const { setAllFlyers, modifyFlyers } = flyersReducer.actions;

export default flyersReducer.reducer;
