import {dish} from './dishSlice.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {deleteDish, fetchDishOrder, fetchEditDish, fetchGetDishes, fetchOneDish} from './AppThunks.ts';
import {RootState} from '../../App/store.ts';

export interface dishes {
  dishes: dish[];
  oneDish: dish | null;
  dishesOrder: dish[];
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  orderLoading: boolean;
  dishEditLoading: boolean | string;
  deleteDish: boolean | string;
  hiddenBlock: boolean;
}

const initialState: dishes = {
  dishes: [],
  oneDish: null,
  dishesOrder: [],
  fetchLoading: false,
  fetchOneLoading: false,
  orderLoading: false,
  dishEditLoading: false,
  deleteDish: false,
  hiddenBlock: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    toggleHiddenBlock: (state) => {
      state.hiddenBlock = !state.hiddenBlock;
    },
    cleanOrder: (state) => {
      state.dishesOrder = [];
    }
  },
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
    builder.addCase(fetchOneDish.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneDish.fulfilled, (state,{payload: dish}: PayloadAction<dish>) => {
      state.fetchOneLoading = false;
      state.oneDish = dish;
    });
    builder.addCase(fetchOneDish.rejected, (state) => {
      state.fetchOneLoading = false;
    });
    builder.addCase(fetchEditDish.pending, (state) => {
      state.dishEditLoading = true;
    });
    builder.addCase(fetchEditDish.fulfilled, (state) => {
      state.dishEditLoading = false;
    });
    builder.addCase(fetchEditDish.rejected, (state) => {
      state.dishEditLoading = false;
    });
    builder.addCase(fetchDishOrder.pending, (state) => {
      state.orderLoading = true;
    });
    builder.addCase(fetchDishOrder.fulfilled, (state, {payload: dishOrder}: PayloadAction<dish>) => {
      state.orderLoading = false;
      state.dishesOrder.push(dishOrder);
    });
    builder.addCase(fetchDishOrder.rejected, (state) => {
      state.orderLoading = false;
    });
  },
});

export const dishesReducer = dishesSlice.reducer;
export const {
  toggleHiddenBlock,
  cleanOrder,
} = dishesSlice.actions;

export const selectDishes = (state: RootState) => state.dishes.dishes;
export const selectDish = (state: RootState) => state.dishes.oneDish;
export const selectDishOrder = (state: RootState) => state.dishes.dishesOrder;
export const selectDishFetchLoading = (state: RootState) => state.dishes.fetchLoading;
export const selectFetchOneLoading = (state: RootState) => state.dishes.fetchOneLoading;
export const selectDishEditLoading = (state: RootState) => state.dishes.dishEditLoading;
export const selectOrderLoading = (state: RootState) => state.dishes.orderLoading;
export const selectDishDelete = (state: RootState) => state.dishes.deleteDish;
export const selectToggleHiddenBlock = (state: RootState) => state.dishes.hiddenBlock;