import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../App/store.ts';

export interface dish {
  id: string;
  title: string;
  price: string;
  image: string;
}

const initialState: dish = {
  id: '',
  title: '',
  price: '',
  image: '',
};

export const dishSlice = createSlice({
  name: 'dish/slice',
  initialState,
  reducers: {
    addDish: (state, {payload}: PayloadAction<dish>) => {
      state.title = payload.title;
      state.price = payload.price;
      state.image = payload.image;
    },
    cleanDish: (state) => {
      state.title = '';
      state.price = '';
      state.image = '';
    }
  },
});

export const dishReducer = dishSlice.reducer;
export const {
  addDish,
  cleanDish,
} = dishSlice.actions;

export const selectorDish = (state: RootState) => state.dish;