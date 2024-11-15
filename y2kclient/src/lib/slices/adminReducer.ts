import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountType } from "@/helpers/Types";
import { CartItem } from "@/helpers/Types";



interface AdminInterface {
  allUsers: AccountType[];
  allCarts: CartItem[];
}

const initialState: AdminInterface = {
  allUsers: [],
  allCarts: [],
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
    }
  },
});

export const {saveUsers, setAdminUser, saveCarts} = adminReducer.actions

export default adminReducer.reducer
