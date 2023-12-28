import {AppDispatch, RootState} from './store.ts';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

export const useAppDispatch: () => AppDispatch = useAppDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;