import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountType } from "@/helpers/types/Account";

interface UserState {
  status: string;
  user: AccountType[] | AccountType;
  token: string | null;
}

const initialState: UserState = {
  status: "",
  user: [],
  token: null,
};

interface LoginPayload {
  user: AccountType;
  token: string;
}

export const accountReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<LoginPayload>) => {
      state.status = "Logged";
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    registerAccount: (state) => {
      state.status = "Signed";
    },
    logOut: (state) => {
      state.token = null;
      state.user = [];
      state.status = "";
    },
    setFromId: (state, action: PayloadAction<any>) =>{
      state.status = "Logged";
      state.user = action.payload;
    }
  },
});

export const { registerAccount, setLogin, logOut, setFromId } = accountReducer.actions;

export default accountReducer.reducer;
