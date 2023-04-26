import { useEffect } from 'react';
import { getOpenApi } from 'src/api';
import { MAX_CONCURRENT_REQUESTS } from 'src/constants/polling';
import { useApiPolling } from 'src/store/ApiRequestPollingContext';

export default function usePollingController() {
  const {
    waitingQueue,
    inProgressQueue,
    activeRequestNum,
    setActiveRequestNum,
    setQueue,
    addToQueue,
    removeFromQueue,
  } = useApiPolling();

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
