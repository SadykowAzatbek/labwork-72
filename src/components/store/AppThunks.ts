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
    await axiosApi.delete<dish>('dishes/' + dishId + '.json');
  },
);

export const fetchOneDish = createAsyncThunk<dish, string>(
  'dish/get',
  async (dishId) => {
    const response = await axiosApi.get<dish | null>('dishes/' + dishId + '.json');
    const dish = response.data;

    if (dish === null) {
      throw new Error('Not found');
    }

    return dish;
  },
);

export const fetchEditDish = createAsyncThunk<void, string, {state: RootState}>(
  'dish/edit',
  async (id, thunkAPI) => {
    const data = thunkAPI.getState().dish;
    await axiosApi.put('dishes/' + id + '.json', data);
  },
);

export const fetchDishOrder = createAsyncThunk<dish, {dishId: string, piece: number}>(
  'dish/order',
  async ({dishId, piece}) => {
    const response = await axiosApi.get<dish | null>('dishes/' + dishId + '.json');
    const dish = response.data;

    if (dish === null) {
      throw new Error('Not found');
    }

    return {
      ...dish,
      id: dishId,
      piece,
    };
  },
);

export const fetchOrderPost = createAsyncThunk<void, {[key: string]: number}>(
  'order/post',
  async (data) => {
    await axiosApi.post('orders.json', data);
  },
);