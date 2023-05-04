import { useReducer, useEffect, useCallback, useState } from 'react';
import {
  QueryItem,
  useApiPollingAction,
} from 'src/store/ApiRequestPollingContext';

import { useRequestTimer } from '../useRequestTimer';

import { InitialState, ReducerFn } from './type';
import { reducer } from './reducer';
import { getInitialArray } from './utils';

type AsyncInfo = QueryItem & {
  needStime?: boolean;
  needEtime?: boolean;
  term?: number;
};

type AsyncOptions<D, E> = {
  select?: (
    state: InitialState<D, E>['data'],
    data: InitialState<D, E>['data'],
  ) => D[];
  lastEtime?: (state: D | null) => number;
  skip?: boolean;
};

export default function useAsyncs<D, E extends Error = Error>(
  deps: unknown[],
  queueItemList: AsyncInfo[],
  options: AsyncOptions<D, E> = {},
) {
  const { select, lastEtime, skip } = options;
  const { queueRequests } = useApiPollingAction();
  const itemLen = queueItemList.length;

  const [state, dispatch] = useReducer<ReducerFn<D, E>>(reducer, {
    isLoading: false,
    isFetching: false,
    dataCandidate: getInitialArray(itemLen),
    data: null,
    error: null,
  });

  const reset = useCallback(
    // 실패한 것만 다시 요청
    () =>
      dispatch({
        type: 'ERROR_RESET',
        dataCandidate: getInitialArray(itemLen),
      }),
    [],
  );

  const makeRequest = (isChange?: boolean) => {
    const initialArr = getInitialArray<D>(itemLen);
    if (!state.data || isChange) {
      dispatch({
        type: 'LOADING',
        dataCandidate: initialArr,
      }); // TODO: 데이터가 없을 때, 혼란의 여지가 있음
    } else
      dispatch({
        type: 'FETCHING',
        dataCandidate: initialArr,
      });
    const queueReadyList = queueItemList.map((queueItem, idx) => {
      const { id, type, key, needStime, needEtime, term } = queueItem;
      const lastTime =
        (lastEtime &&
          !isChange &&
          lastEtime(state.data ? state.data[idx] : null)) ||
        0;
      const stime: number =
        needStime && term ? lastTime || Date.now() - term : 0;
      const etime: number = needEtime ? Date.now() : 0;
      return {
        id,
        type,
        key,
        param: { stime, etime },
        onSuccess: (data: D) => {
          dispatch({
            type: 'PART_SUCCESS',
            dataCallback: (candidate: InitialState<D, E>['dataCandidate']) => {
              console.log(`candidate[${idx}]`, candidate);
              return [
                ...candidate.slice(0, idx),
                data,
                ...candidate.slice(idx + 1),
              ];
            },
          });
        },
        onError: (e: E) => dispatch({ type: 'ERROR', error: e }), // TODO: 큐에서 나머지 요청 없애기
      };
    });

    console.log('[queueReadyList]', queueReadyList);

    queueRequests(queueReadyList);
  };

  useEffect(() => {
    dispatch({
      type: 'LOADING',
      dataCandidate: getInitialArray(itemLen),
    });
  }, deps);

  useEffect(() => {
    if (skip) return;
    if (state.data || state.error) return;
    makeRequest(true);
  }, [...deps, state.data, state.error]);

  useEffect(() => {
    console.log('[candidate changed]', state.dataCandidate);
    if (!state.dataCandidate.every((data) => !!data)) return;
    dispatch({
      type: 'SUCCESS',
      dataCandidate: getInitialArray(itemLen),
      data: select
        ? select(state.data, state.dataCandidate)
        : state.dataCandidate,
    });
  }, [state.dataCandidate]);

  //   useRequestTimer([...deps, state.data, state.error], makeRequest, {
  //     dismissCondition: skip || !state.data || !!state.error,
  //   });

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    isFetching: state.isFetching,
    refetch: makeRequest,
    reset,
  };
}
