import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountType } from "@/helpers/Types";

interface Taskes {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  color: string;
  size: string;
  state: string;
}

interface AdminInterface {
  allUsers: AccountType[];
  allTasks: Taskes[];
}

const initialState: AdminInterface = {
  allUsers: [],
  allTasks: [],
};

export const adminReducer = createSlice({
  name: "adminReducer",
  initialState,
  reducers: {
    saveUsers: (state, action: PayloadAction<AccountType[]>) => {
      state.allUsers = action.payload;
    },
  },
});
