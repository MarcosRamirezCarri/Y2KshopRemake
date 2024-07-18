import { createSlice, PayloadAction } from '@reduxjs/toolkit';


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
      state.status = 'Logged';
      state.token = action.payload.token;
      state.user = action.payload.user;
  
    },
    registerAccount: (state, action: PayloadAction<LoginPayload>) => {
      state.status = 'Signed'; 
    },
    logOut: (state) =>{
      state.token = null;
      state.user = [];
      state.status = '';


    }
  }
});

export const { registerAccount, setLogin, logOut } = accountReducer.actions;

export default accountReducer.reducer;