import { configureStore } from '@reduxjs/toolkit';
import shirtsReducer from './slices/shirtsReducer';
import pantsReducer from './slices/pantsReducer';


export const store = configureStore({
  reducer: {
    shirts: shirtsReducer,
    pants: pantsReducer,

  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch