import { useReducer, useEffect, useCallback } from 'react';
import { useApiPollingAction } from 'src/store/ApiRequestPollingContext';
import { isTimeExist } from 'src/utils/isTimeExist';
import { AsyncInfo } from 'src/types/async';

import { useRequestTimer } from '../useRequestTimer';

import { AsyncOptions, ReducerFn, UseAsyncResult } from './type';
import { reducer } from './reducer';

/**
 * api 요청을 관리하는 커스텀 훅
 * queueItem에 sTime, eTime을 지정할 수 있음
 * @param deps
 * @param queueItem
 * @param options
 * @returns {UseAsyncResult<D, E>}
 */

export default function useAsync<D, E extends Error = Error>(
  deps: unknown[],
  queueItem: AsyncInfo,
  options: AsyncOptions<D, E> = {},
): UseAsyncResult<D, E> {
  const { select, lastEtime, skip, timeSkip } = options;
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
    const { type, apiKind, key, needStime, needEtime, term, params } =
      queueItem;
    const time = { sTime: queueItem.sTime, eTime: queueItem.eTime };
    const isTimeExists = isTimeExist(time);
    const lastTime = (lastEtime && !isChange && lastEtime(state.data)) || 0;
    const stime: number = needStime && term ? lastTime || Date.now() - term : 0;
    const etime: number = needEtime ? Date.now() : 0;

    queueRequest({
      type,
      apiKind,
      key,
      param: {
        ...params,
        stime: isTimeExists ? time.sTime : stime,
        etime: isTimeExists ? time.eTime : etime,
      },
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
    dismissCondition:
      skip ||
      timeSkip ||
      !state.data ||
      !!state.error ||
      isTimeExist({ sTime: queueItem.sTime, eTime: queueItem.eTime }),
  });

  return {
    ...state,
    reset,
  };
}
