import { useReducer, useEffect } from 'react';

type InitialState<D, E> = {
  isLoading: boolean;
  data: D | null;
  error: E | null;
};

type LoadingAction = {
  type: 'LOADING';
};

type SuccessAction<T> = {
  type: 'SUCCESS';
  data: T;
};

type ErrorAction<T> = {
  type: 'ERROR';
  error: T;
};

type InitialAction<D, E> = LoadingAction | SuccessAction<D> | ErrorAction<E>;

type ReducerFn<D, E> = (
  states: InitialState<D, E>,
  action: InitialAction<D, E>,
) => InitialState<D, E>;

function reducer<D, E>(state: InitialState<D, E>, action: InitialAction<D, E>) {
  switch (action.type) {
    case 'LOADING':
      return {
        isLoading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        isLoading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        isLoading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`[Unhandled action type]: ${action}`);
  }
}

type PromiseFn<T> = (...args: any) => Promise<T>;

function useAsync<D, E>(
  deps: unknown[],
  promiseFn: PromiseFn<D>,
  skip = false,
) {
  const [state, dispatch] = useReducer<ReducerFn<D, E>>(reducer, {
    isLoading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await promiseFn();
      dispatch({ type: 'SUCCESS', data });
    } catch (e: any) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { ...state, refetch: fetchData };
}

export default useAsync;
