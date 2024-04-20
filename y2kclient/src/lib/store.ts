import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsReducer';
import cartReducer from './slices/cartReducer';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,

  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch