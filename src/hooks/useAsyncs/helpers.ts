import { AsyncOptions, InitialState } from './type';

export const setBools =
  <D, E, T extends 'loading' | 'fetching' | 'errorInfos'>(
    idx: number,
    value: boolean,
  ) =>
  (bools: InitialState<D, E>[T]): boolean[] => {
    return [...bools.slice(0, idx), value, ...bools.slice(idx + 1)];
  };

export const setData =
  <D, E>(data: D, idx: number, select: AsyncOptions<D>['select']) =>
  (state: InitialState<D, E>['data']): D[] => {
    const candidate = select ? select(state[idx], data) : data;
    return [...state.slice(0, idx), candidate, ...state.slice(idx + 1)];
  };

export const errorHappenedData =
  <D, E>(idx: number) =>
  (state: InitialState<D, E>['data']): D[] => {
    return [...state.slice(0, idx), undefined as D, ...state.slice(idx + 1)];
  };
