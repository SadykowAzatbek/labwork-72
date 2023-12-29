import {dish} from './dishSlice.ts';
import {createSlice} from '@reduxjs/toolkit';
import {deleteDish, fetchGetDishes} from './AppThunks.ts';
import {RootState} from '../../App/store.ts';

export interface dishes {
  dishes: dish[];
  fetchLoading: boolean;
  deleteDish: boolean | string;
}

const initialState: dishes = {
  dishes: [],
  fetchLoading: false,
  deleteDish: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetDishes.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchGetDishes.fulfilled, (state, {payload: dishes}) => {
      state.fetchLoading = false;
      state.dishes = dishes;
    });
    builder.addCase(fetchGetDishes.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(deleteDish.pending, (state, {meta}) => {
      state.deleteDish = meta.arg;
    });
    builder.addCase(deleteDish.fulfilled, (state) => {
      state.deleteDish = false;
    });
    builder.addCase(deleteDish.rejected, (state) => {
      state.deleteDish = false;
    });
  },
});

export const dishesReducer = dishesSlice.reducer;
export const selectDishes = (state: RootState) => state.dishes.dishes;
export const selectDishFetchLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectDishDelete = (state: RootState) => state.dishes.deleteDish;