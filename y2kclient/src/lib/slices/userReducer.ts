import { createSlice, PayloadAction } from '@reduxjs/toolkit';


 interface AccountType {
  id: number;
  password: string;
  name: string;
  email: string;  
  phone: string;
  admin: boolean | null;
}

interface ProductState {
  status: string;
  account: AccountType[];
  token: string | null;
}

const initialState: ProductState = {
  status: "",
  account: [],
  token: null,
};

interface LoginPayload {
  accounts: AccountType[];
  token: string;
}

export const accountReducer = createSlice({
  name: "account",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<LoginPayload>) => {
      state.status = 'Logged';
      state.account = action.payload.accounts;
      state.token = action.payload.token;
    },
    registerAccount: (state, action: PayloadAction<LoginPayload>) => {
      state.status = 'Signed';
      state.account = action.payload.accounts;
      
    },
  }
});

export const { registerAccount, setLogin } = accountReducer.actions;

export default accountReducer.reducer;