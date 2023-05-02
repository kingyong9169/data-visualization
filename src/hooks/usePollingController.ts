import { useEffect } from 'react';
import { getOpenApi } from 'src/api';
import { MAX_CONCURRENT_REQUESTS } from 'src/constants/polling';
import {
  useApiPollingAction,
  useApiPollingValue,
} from 'src/store/ApiRequestPollingContext';

export default function usePollingController() {
  const { waitingQueue, inProgressQueue, activeRequestNum } =
    useApiPollingValue();
  const { setActiveRequestNum, setQueue, addToQueue, removeFromQueue } =
    useApiPollingAction();
  // 왜 상태로 큐?
  // react로 인해 발생하는 문제의 문제를 해결해야 함.
  // 큐 상태로 인해 리렌더링이 일어나는게 문제
  // TODO: 옵저버 직접 구현

  useEffect(() => {
    // 대기 큐 -> 대기, 진행 큐에 변화가 생기면 진행 큐에 추가(최대 동시 요청 개수를 넘지 않도록 제한)
    if (
      activeRequestNum >= MAX_CONCURRENT_REQUESTS ||
      inProgressQueue.length >= MAX_CONCURRENT_REQUESTS
    )
      return;
    if (waitingQueue.length === 0) return;
    async function processWaitQueue() {
      const toSliceIdx = MAX_CONCURRENT_REQUESTS - activeRequestNum;
      if (toSliceIdx <= 0) return;
      const toAddQueue = waitingQueue.slice(0, toSliceIdx);
      const restQueue = waitingQueue.slice(toSliceIdx);
      toAddQueue.forEach((item) => {
        addToQueue('progress', item);
      });
      setQueue('wait', restQueue);
    }
    processWaitQueue();
  }, [inProgressQueue, waitingQueue, activeRequestNum]);

  useEffect(() => {
    // 진행 큐 -> 동시 요청 개수가 넘지 않으면 대기 큐에 있는 것 모두 실행(최대 동시 요청 개수만큼)
    if (activeRequestNum >= MAX_CONCURRENT_REQUESTS) return;
    function processQueue() {
      const sliceIdx = MAX_CONCURRENT_REQUESTS - activeRequestNum;
      const slicedQueue = inProgressQueue.slice(0, sliceIdx);
      slicedQueue.forEach(async (requestInfo) => {
        // TODO: 원본 데이터 오염의 가능성이 있다. 이를 방지할 로직이 있는지
        const { type, key, param, onSuccess, onError } = requestInfo;
        try {
          // 요청하고 나서 진행 큐가 바뀌니까 useEffect가 실행되면서 이미 진행되는 api를 또 호출함
          removeFromQueue('progress', requestInfo);
          setActiveRequestNum((num) => num + 1);
          const res = await getOpenApi(type)(key, param);
          setActiveRequestNum((num) => num - 1);
          onSuccess(res);
        } catch (e) {
          setActiveRequestNum((num) => num - 1);
          onError(e);
        }
      });
    }
    processQueue();
  }, [activeRequestNum, inProgressQueue]);
}
