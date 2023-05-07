import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { ApiRequest } from 'src/api';
import { ApiKind, OpenAPIType } from 'src/types/openApiTypes';

export type QueryItem = ApiRequest & {
  type: OpenAPIType;
  apiKind?: ApiKind;
};

export type QueueRequestObj = QueryItem & {
  onSuccess: (args: any) => void;
  onError: (args: any) => void;
};

type PollingValueContext = {
  waitingQueue: QueueRequestObj[];
  inProgressQueue: QueueRequestObj[];
  activeRequestNum: number;
};

type PollingActionContext = {
  setActiveRequestNum: Dispatch<SetStateAction<number>>;
  setQueue: (kind: 'wait' | 'progress', queue: QueueRequestObj[]) => void;
  addToQueue: (kind: 'wait' | 'progress', requestInfo: QueueRequestObj) => void;
  removeFromQueue: (
    kind: 'wait' | 'progress',
    requestInfo: QueueRequestObj,
  ) => QueueRequestObj;
  queueRequest: (request: QueueRequestObj) => void;
  queueRequests: (requestList: QueueRequestObj[]) => void;
};

const ApiPollingValueContext = createContext<PollingValueContext>({
  waitingQueue: [],
  inProgressQueue: [],
  activeRequestNum: 0,
});

const ApiPollingActionContext = createContext<PollingActionContext>({
  setActiveRequestNum: () => {},
  setQueue: () => {},
  addToQueue: () => {},
  removeFromQueue: () => ({
    key: '',
    type: '',
    onSuccess: () => {},
    onError: () => {},
  }),
  queueRequest: () => {},
  queueRequests: () => {},
});

type Props = {
  children: JSX.Element;
};

function ApiPollingProvider({ children }: Props): JSX.Element {
  const [activeRequestNum, setActiveRequestNum] = useState(0);
  const [waitingQueue, setWaitingQueue] = useState<QueueRequestObj[]>([]);
  const [inProgressQueue, setInProgressQueue] = useState<QueueRequestObj[]>([]);

  const addToQueue = useCallback(
    (kind: 'wait' | 'progress', requestInfo: QueueRequestObj) => {
      if (kind === 'wait') {
        setWaitingQueue((queue) => [...queue, requestInfo]);
      } else {
        setInProgressQueue((queue) => [...queue, requestInfo]);
      }
    },
    [],
  );

  const removeFromQueueCallback = useCallback(
    (requestInfo: QueueRequestObj) => (queue: QueueRequestObj[]) => {
      const index = queue.findIndex((item) => item.key === requestInfo.key); // TODO: o(1)로 바꾸기
      return index > -1 ? queue.filter((_, idx) => idx !== index) : queue;
    },
    [],
  );

  // 각 요청에 대한 인덱스에 boolean을 넣은 배열을 만들어서 관리
  // true면 건너뛰고
  // 큐에 100개가 들어오면 한 번에 filter로 정리
  // pointer 상태로 최근 요청 가리키기

  const actions = useMemo(
    () => ({
      setActiveRequestNum,
      addToQueue,
      removeFromQueueCallback,
      setQueue(kind: 'wait' | 'progress', queue: QueueRequestObj[]) {
        if (kind === 'wait') {
          setWaitingQueue(queue);
        } else {
          setInProgressQueue(queue);
        }
      },
      removeFromQueue(
        kind: 'wait' | 'progress',
        requestInfo: QueueRequestObj,
      ): QueueRequestObj {
        if (kind === 'wait') {
          setWaitingQueue(removeFromQueueCallback(requestInfo));
        } else {
          setInProgressQueue(removeFromQueueCallback(requestInfo));
        }
        return { ...requestInfo };
      },
      queueRequest(request: QueueRequestObj) {
        return addToQueue('wait', request);
      },
      queueRequests(requestList: QueueRequestObj[]) {
        requestList.forEach((request) => addToQueue('wait', request));
      },
    }),
    [],
  );

  return (
    <ApiPollingValueContext.Provider
      value={{
        waitingQueue,
        inProgressQueue,
        activeRequestNum,
      }}
    >
      <ApiPollingActionContext.Provider value={actions}>
        {children}
      </ApiPollingActionContext.Provider>
    </ApiPollingValueContext.Provider>
  );
}

function useApiPollingValue(): PollingValueContext {
  const context = useContext(ApiPollingValueContext);
  if (context === undefined) {
    throw new Error(
      'useApiRequestPolling must be used within a ApiRequestPollingProvider',
    );
  }
  return context;
}

function useApiPollingAction(): PollingActionContext {
  const context = useContext(ApiPollingActionContext);
  if (context === undefined) {
    throw new Error(
      'useApiRequestPolling must be used within a ApiRequestPollingProvider',
    );
  }
  return context;
}

export {
  ApiPollingActionContext,
  ApiPollingProvider,
  useApiPollingValue,
  useApiPollingAction,
};
