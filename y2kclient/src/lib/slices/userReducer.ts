import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountType {
  id: number;
  password: string;
  name: string;
  email: string;
  phone: string;
  admin: boolean | null;
}

interface UserState {
  status: string;
  user: AccountType[];
  token: string | null;
}

const initialState: UserState = {
  status: "",
  user: [],
  token: null,
};

interface LoginPayload {
  user: AccountType[];
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
      let helpArray = [];
      helpArray.push(action.payload);

      state.user = helpArray;
    }
  },
});

export const { registerAccount, setLogin, logOut, setFromId } = accountReducer.actions;

export default accountReducer.reducer;
