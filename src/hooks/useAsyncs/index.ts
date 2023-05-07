import { useReducer, useEffect, useCallback } from 'react';
import { useApiPollingAction } from 'src/store/ApiRequestPollingContext';

import { useRequestTimer } from '../useRequestTimer';

import {
  MultiAsyncItem,
  AsyncInfoWithId,
  AsyncOptions,
  ReducerFn,
  UseAsyncsResult,
} from './type';
import { reducer } from './reducer';
import { getInitialArr } from './utils';
import { errorHappenedData, setData, setBools, getLoadingArr } from './helpers';

/**
 * 동일한 타입을 리턴하는 여러 api 요청을 관리하는 커스텀 훅
 * 각 queueItem에 sTime, eTime은 지정할 수 없음
 * @param deps
 * @param queueItemList
 * @param options
 * @returns {UseAsyncsResult<D, E>}
 */

export default function useAsyncs<D, E extends Error = Error>(
  deps: unknown[],
  queueItemList: MultiAsyncItem[],
  options: AsyncOptions<D> = {},
): UseAsyncsResult<D, E> {
  // TODO: 각 쿼리 아이템에 options를 받게끔 확장하기
  const { select, lastEtime, skip } = options;
  const { queueRequests } = useApiPollingAction();
  const itemLen = queueItemList.length;
  const itemListWithId = queueItemList.map((item, idx) => ({ ...item, idx }));
  const initialDataArr = getInitialArr<D>(itemLen);
  const loadingArr = getInitialArr<boolean>(itemLen, true);
  const loadingEndArr = getInitialArr<boolean>(itemLen, false);

  const [state, dispatch] = useReducer<ReducerFn<D, E>>(reducer, {
    loading: [...loadingEndArr],
    fetching: [...loadingEndArr],
    data: [...initialDataArr],
    error: null,
    errorInfos: [...loadingEndArr],
  });

  const reset = useCallback(
    () =>
      dispatch({
        type: 'ERROR_RESET',
        loading: [...loadingEndArr],
        fetching: [...loadingEndArr],
      }),
    [],
  );

  const getQueueReadyList = (
    itemList: AsyncInfoWithId[],
    isChange?: boolean,
  ) => {
    return itemList.map((queueItem) => {
      const { idx, type, key, needStime, needEtime, term, apiKind, params } =
        queueItem;
      const lastTime =
        (lastEtime && !isChange && lastEtime(state.data[idx])) || 0;
      const stime: number =
        needStime && term ? lastTime || Date.now() - term : 0;
      const etime: number = needEtime ? Date.now() : 0;
      return {
        type,
        apiKind,
        key,
        param: { ...params, stime, etime },
        onSuccess: (data: D) => {
          const loadingCallback = <T extends 'loading' | 'fetching'>() =>
            setBools<D, E, T>(idx, false);
          dispatch({
            type: 'PART_SUCCESS',
            loadingCb: isChange ? loadingCallback<'loading'>() : undefined,
            fetchingCb: isChange ? undefined : loadingCallback<'fetching'>(),
            dataCb: setData<D, E>(data, idx, select),
          });
        },
        onError: (e: E) =>
          dispatch({
            type: 'ERROR',
            error: e,
            errorCb: errorHappenedData(idx),
            errorInfosCb: setBools<D, E, 'errorInfos'>(idx, true),
            loading: [...loadingEndArr],
            fetching: [...loadingEndArr],
          }),
      };
    });
  };

  const makeRequest = (itemList: AsyncInfoWithId[], isChange?: boolean) => {
    if (isChange) {
      dispatch({
        type: 'LOADING',
        loading: getLoadingArr(itemList, [...loadingArr]),
        errorInfos: [...loadingEndArr],
        data: [...initialDataArr],
      });
    } else
      dispatch({
        type: 'FETCHING',
        fetching: getLoadingArr(itemList, [...loadingArr]),
        errorInfos: [...loadingEndArr],
      });
    queueRequests(getQueueReadyList(itemList, isChange));
  };

  useEffect(() => {
    if (skip) return;
    makeRequest(itemListWithId, true);
  }, [...deps]);

  useEffect(() => {
    if (skip) return;
    if (state.error || state.errorInfos.every((e) => !e)) return;
    const errItemIds: number[] = state.errorInfos.reduce((acc, cur, idx) => {
      if (!cur) return acc;
      return [...acc, idx];
    }, [] as number[]);
    const itemList = itemListWithId.filter(({ idx }) =>
      errItemIds.includes(idx),
    );
    makeRequest(itemList, true);
  }, [state.error, state.errorInfos]);

  useRequestTimer(
    [...deps, state.data, state.error],
    () => makeRequest(itemListWithId),
    {
      dismissCondition: skip || !state.data.every((d) => !!d) || !!state.error,
    },
  );

  return {
    data: state.data,
    error: state.error,
    isLoading: state.loading.some((loading) => loading),
    isFetching: state.fetching.some((loading) => loading),
    reset,
  };
}
