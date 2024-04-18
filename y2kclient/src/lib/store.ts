import { configureStore } from '@reduxjs/toolkit';
import shirtsReducer from './slices/shirtsReducer';
import cartReducer from './slices/cartReducer';


export const store = configureStore({
  reducer: {
    shirts: shirtsReducer,
    cart: cartReducer,

  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch