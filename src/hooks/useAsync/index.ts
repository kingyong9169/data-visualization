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

// TODO: 요청 파라미터 캐싱

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
      // TODO: 데이터가 없을 때, 혼란의 여지가 있음
      dispatch({ type: 'LOADING' });
    } else dispatch({ type: 'FETCHING' });
    const { id, type, key, needStime, needEtime, term } = queueItem;
    const lastTime = (lastEtime && !isChange && lastEtime(state.data)) || 0;
    const stime = needStime && term ? lastTime || Date.now() - term : ''; // TODO: 타입 불일치
    const etime = needEtime ? Date.now() : ''; // TODO: 타입 불일치

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
    // 타이머를 개별로 제어: 큐의 request 갱신
    // timer를 따로 훅으로
    // 입수한 데이터들의 시간 간격
    if (skip || !state.data || state.error) return;
    const timer = setTimeout(() => {
      makeRequest();
    }, duration);
    return () => clearTimeout(timer);
  }, [...deps, state.data, state.error]);
  // TODO: 시간 제어를 일체로 빼기: 외곽에서 일괄로 제어하기
  // 좀 더 조밀하게 제어가 되어야 할 것 같다.

  return {
    ...state,
    refetch: makeRequest,
    reset,
  };
}
