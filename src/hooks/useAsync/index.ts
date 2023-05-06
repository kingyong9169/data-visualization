import { useReducer, useEffect, useCallback } from 'react';
import { useApiPollingAction } from 'src/store/ApiRequestPollingContext';

import { useRequestTimer } from '../useRequestTimer';

import { AsyncInfo, AsyncOptions, ReducerFn } from './type';
import { reducer } from './reducer';

// TODO: 요청 파라미터 캐싱

export default function useAsync<D, E extends Error = Error>(
  deps: unknown[],
  queueItem: AsyncInfo,
  options: AsyncOptions<D, E> = {},
) {
  const { select, lastEtime, skip } = options;
  const { queueRequest } = useApiPollingAction();

  const [state, dispatch] = useReducer<ReducerFn<D, E>>(reducer, {
    isLoading: false,
    isFetching: false,
    data: null,
    error: null,
  });

  const reset = useCallback(() => dispatch({ type: 'ERROR_RESET' }), []);

  const makeRequest = (isChange?: boolean) => {
    if (isChange) {
      dispatch({ type: 'LOADING' });
    } else dispatch({ type: 'FETCHING' });
    const { type, key, needStime, needEtime, term } = queueItem;
    const lastTime = (lastEtime && !isChange && lastEtime(state.data)) || 0;
    const stime: number = needStime && term ? lastTime || Date.now() - term : 0;
    const etime: number = needEtime ? Date.now() : 0;

    queueRequest({
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

  useRequestTimer([...deps, state.data, state.error], makeRequest, {
    dismissCondition: skip || !state.data || !!state.error,
  });

  return {
    ...state,
    refetch: makeRequest,
    reset,
  };
}
