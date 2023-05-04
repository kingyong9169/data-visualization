import { useReducer, useEffect, useCallback } from 'react';
import { useApiPollingAction } from 'src/store/ApiRequestPollingContext';

import { useRequestTimer } from '../useRequestTimer';

import { AsyncInfo, AsyncOptions, ReducerFn } from './type';
import { reducer } from './reducer';
import { getInitialArr } from './utils';
import { setData, setLoading } from './helpers';

export default function useAsyncs<D, E extends Error = Error>(
  deps: unknown[],
  queueItemList: AsyncInfo[],
  options: AsyncOptions<D> = {},
) {
  const { select, lastEtime, skip } = options;
  const { queueRequests } = useApiPollingAction();
  const itemLen = queueItemList.length;
  const initialDataArr = getInitialArr<D>(itemLen);
  const loadingArr = getInitialArr<boolean>(itemLen, true);
  const loadingEndArr = getInitialArr<boolean>(itemLen, false);

  const [state, dispatch] = useReducer<ReducerFn<D, E>>(reducer, {
    loading: [...loadingEndArr],
    fetching: [...loadingEndArr],
    data: [...initialDataArr],
    error: null,
  });

  const reset = useCallback(
    // TODO: 실패한 것만 다시 요청
    () =>
      dispatch({
        type: 'ERROR_RESET',
        loading: [...loadingEndArr],
        fetching: [...loadingEndArr],
      }),
    [],
  );

  const makeRequest = (isChange?: boolean) => {
    if (isChange) {
      dispatch({
        type: 'LOADING',
        loading: [...loadingArr],
        data: [...initialDataArr],
      });
    } else
      dispatch({
        type: 'FETCHING',
        fetching: [...loadingArr],
        data: [...initialDataArr],
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
            loadingCb: isChange ? setLoading<D, E, 'loading'>(idx) : undefined,
            fetchingCb: isChange
              ? undefined
              : setLoading<D, E, 'fetching'>(idx),
            dataCb: setData<D, E>(data, idx, select),
          });
        },
        onError: (e: E) =>
          dispatch({
            type: 'ERROR',
            error: e,
            data: [...initialDataArr],
            loading: [...loadingEndArr],
            fetching: [...loadingEndArr],
          }),
      };
    });

    queueRequests(queueReadyList);
  };

  useEffect(() => {
    if (skip) return;
    if (!!state.error) return;
    makeRequest(true);
  }, [...deps, state.error]);

  useRequestTimer([...deps, state.data, state.error], makeRequest, {
    dismissCondition: skip || !state.data || !!state.error,
  });

  return {
    data: state.data,
    error: state.error,
    isLoading: state.loading.some((loading) => loading),
    isFetching: state.fetching.some((loading) => loading),
    refetch: makeRequest,
    reset,
  };
}
