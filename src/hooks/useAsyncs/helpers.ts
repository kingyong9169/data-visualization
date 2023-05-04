import { AsyncOptions, InitialState } from './type';

export const setLoading =
  <D, E, T extends 'loading' | 'fetching'>(idx: number) =>
  (loading: InitialState<D, E>[T]) => {
    return [...loading.slice(0, idx), false, ...loading.slice(idx + 1)];
  };

export const setData =
  <D, E>(data: D, idx: number, select: AsyncOptions<D>['select']) =>
  (state: InitialState<D, E>['data']) => {
    const candidate = select ? select(state[idx], data) : data;
    return [...state.slice(0, idx), candidate, ...state.slice(idx + 1)];
  };
