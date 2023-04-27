import { useReducer, useEffect } from 'react';
import { QueryItem, useApiPolling } from 'src/store/ApiRequestPollingContext';

type InitialState<D, E> = {
  isLoading: boolean;
  isFetching: boolean;
  data: D | null;
  error: E | null;
};

type LoadingAction = {
  type: 'LOADING';
};

type FetchingAction = {
  type: 'FETCHING';
};

type SuccessAction<T> = {
  type: 'SUCCESS';
  data: T;
};

type ErrorAction<T> = {
  type: 'ERROR';
  error: T;
};

type InitialAction<D, E> =
  | LoadingAction
  | FetchingAction
  | SuccessAction<D>
  | ErrorAction<E>;

type ReducerFn<D, E> = (
  states: InitialState<D, E>,
  action: InitialAction<D, E>,
) => InitialState<D, E>;

function reducer<D, E>(state: InitialState<D, E>, action: InitialAction<D, E>) {
  switch (action.type) {
    case 'LOADING':
      return {
        isLoading: true,
        isFetching: false,
        data: state.data ? state.data : null,
        error: null,
      };
    case 'FETCHING':
      return {
        isLoading: false,
        isFetching: true,
        data: state.data ? state.data : null,
        error: null,
      };
    case 'SUCCESS':
      return {
        isLoading: false,
        isFetching: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        isLoading: false,
        isFetching: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`[Unhandled action type]: ${action}`);
  }
}

type AsyncInfo = QueryItem & {
  needStime?: boolean;
  needEtime?: boolean;
  term?: number;
};

export default function useAsync<D, E extends Error = Error>(
  deps: unknown[],
  queueItem: AsyncInfo,
  skip = false,
) {
  const { queueRequest } = useApiPolling();
  const [state, dispatch] = useReducer<ReducerFn<D, E>>(reducer, {
    isLoading: false,
    isFetching: false,
    data: null,
    error: null,
  });
  // TODO: isFetching 로직 수정
  const makeRequest = () => {
    if (!state.data) {
      dispatch({ type: 'LOADING' });
    } else dispatch({ type: 'FETCHING' });
    const { id, type, key, needStime, needEtime, term } = queueItem;
    queueRequest({
      id,
      type,
      key,
      param: {
        stime: needStime && term ? Date.now() - term : '',
        etime: needEtime ? Date.now() : '',
      },
      onSuccess: (data: D) => dispatch({ type: 'SUCCESS', data }),
      onError: (e: E) => dispatch({ type: 'ERROR', error: e }),
    });
  };

  useEffect(() => {
    if (skip) return;
    makeRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    // TODO: error 발생 시 timer 스탑
    if (skip) return;
    const timer = setTimeout(() => {
      makeRequest();
    }, 5000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, state.data]);

  return { ...state, refetch: makeRequest };
}
