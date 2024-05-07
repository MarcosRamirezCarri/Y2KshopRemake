import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Account {
    id: number;
    name: string;
    email: number;
    image: string;
    phone: string
  }
  
  interface ProductState{
    status: string;
    account: Account[];
  }
  
  const initialState: ProductState = {
    status: "",
    account: [],
  };


export const accountReducer = createSlice({
    name: "account",
    initialState,
    reducers:{
        setLogin: (state, action: PayloadAction<Account[]>) => {
            state.status = 'Logged'
        }, 
    }
    
    });
    
    export const { setLogin } = accountReducer.actions;
    
    export default accountReducer.reducer;