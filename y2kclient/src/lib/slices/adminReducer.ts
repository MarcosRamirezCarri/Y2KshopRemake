import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountType } from "@/helpers/types/Types";
import { CartItem } from "@/helpers/types/Types";



interface AdminInterface {
  allUsers: AccountType[];
  allCarts: CartItem[];
  selectedState: string;
}

const initialState: AdminInterface = {
  allUsers: [],
  allCarts: [],
  selectedState: 'all'
};

export const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    saveUsers: (state, action: PayloadAction<AccountType[]>) => {
      state.allUsers = action.payload;
    },
    saveCarts:(state, action: PayloadAction<CartItem[]>) => {
      state.allCarts = action.payload;
    },

    setAdminUser: (state, action: PayloadAction<AccountType>) =>{
      const index = state.allUsers.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.allUsers[index] = action.payload;
      }
    },
    setSelectedState: (state, action: PayloadAction<string>) => {
      state.selectedState = action.payload; 
    },
  },
});

export const {saveUsers, setAdminUser, saveCarts, setSelectedState} = adminReducer.actions

export default adminReducer.reducer
