import {configureStore} from '@reduxjs/toolkit';
import {dishReducer} from '../components/store/dishSlice.ts';
import {dishesReducer} from '../components/store/dishesSlice.ts';

export const store = configureStore({
  reducer: {
    dish: dishReducer,
    dishes: dishesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;