import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../App/store.ts';
import axiosApi from '../../axiosApi.ts';
import {dish} from './dishSlice.ts';

export const fetchDishPost = createAsyncThunk<void, undefined, {state: RootState}>(
  'dish/post',
  async (_, ThunkAPI) => {
    const info = ThunkAPI.getState().dish;

    await axiosApi.post<dish>('dishes.json', info);
  },
);

export const fetchGetDishes = createAsyncThunk<dish[]>(
  'dishes/get',
  async () => {
    const response = await  axiosApi.get<{[key: string]: dish}>('dishes.json');
    const dishes = response.data;

    if (!dishes) {
      return [];
    }

    return Object.keys(dishes).map((key) => {
      const dish = dishes[key];
      return {
        ...dish,
        id: key,
      }
    });
  },
);

export const deleteDish = createAsyncThunk<void, string>(
  'dish/delete',
  async (dishId) => {
    await axiosApi.delete('dishes/' + dishId + '.json');
  },
);