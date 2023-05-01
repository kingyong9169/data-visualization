import { useReducer, useEffect } from 'react';
import {
  QueryItem,
  useApiPollingAction,
} from 'src/store/ApiRequestPollingContext';

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
        data: null,
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

type AsyncOptions<D, E> = {
  select?: (state: InitialState<D, E>['data'], data: D) => D;
  lastEtime?: (state: InitialState<D, E>['data']) => number;
  skip?: boolean;
  pollingDuration?: number;
};

export default function useAsync<D, E extends Error = Error>(
  deps: unknown[],
  queueItem: AsyncInfo,
  options: AsyncOptions<D, E> = {},
) {
  const { select, lastEtime, skip, pollingDuration } = options;
  const { queueRequest } = useApiPollingAction();
  const duration = pollingDuration || 5000;

  const [state, dispatch] = useReducer<ReducerFn<D, E>>(reducer, {
    isLoading: false,
    isFetching: false,
    data: null,
    error: null,
  });

  const makeRequest = (isChange?: boolean) => {
    if (!state.data || isChange) {
      dispatch({ type: 'LOADING' });
    } else dispatch({ type: 'FETCHING' });
    const { id, type, key, needStime, needEtime, term } = queueItem;
    const lastTime = (lastEtime && !isChange && lastEtime(state.data)) || 0;
    const stime = needStime && term ? lastTime || Date.now() - term : '';
    const etime = needEtime ? Date.now() : '';

    queueRequest({
      id,
      type,
      key,
      param: { stime, etime },
      onSuccess: (data: D) =>
        dispatch({
          type: 'SUCCESS',
          data: select ? select(state.data, data) : data,
        }),
      onError: (e: E) => dispatch({ type: 'ERROR', error: e }),
    });
  };

  useEffect(() => {
    dispatch({ type: 'LOADING' });
  }, deps);

  useEffect(() => {
    if (skip) return;
    if (!state.data) makeRequest(true);
  }, [...deps, state.data]);

  useEffect(() => {
    // TODO: error 발생 시 timer 스탑
    if (skip || !state.data) return;
    const timer = setTimeout(() => {
      makeRequest();
    }, duration);
    return () => clearTimeout(timer);
  }, [...deps, state.data]);

  return { ...state, refetch: makeRequest };
}
