import { useReducer, useEffect, useCallback } from 'react';
import {
  QueryItem,
  useApiPollingAction,
} from 'src/store/ApiRequestPollingContext';

import { InitialState, ReducerFn } from './type';
import { reducer } from './reducer';

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

  const reset = useCallback(() => dispatch({ type: 'ERROR_RESET' }), []);

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
    if (!state.data && !state.error) makeRequest(true);
  }, [...deps, state.data, state.error]);

  useEffect(() => {
    if (skip || !state.data || state.error) return;
    const timer = setTimeout(() => {
      makeRequest();
    }, duration);
    return () => clearTimeout(timer);
  }, [...deps, state.data, state.error]);

  return {
    ...state,
    refetch: makeRequest,
    reset,
  };
}
