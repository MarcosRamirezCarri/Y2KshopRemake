import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsReducer';
import cartReducer from './slices/cartReducer';
import  flyersReducer  from './slices/flyersReducer';
import adminReducer from './slices/adminReducer';
import  accountReducer  from './slices/userReducer';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    account: accountReducer,
    admin: adminReducer,
    flyers: flyersReducer

  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch