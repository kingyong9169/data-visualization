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
import { OpenAPIType } from 'src/types/openApiTypes';

export type QueryItem = ApiRequest & {
  id: number;
  type: OpenAPIType;
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
  ) => void;
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
  removeFromQueue: () => {},
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
      const index = queue.findIndex((item) => item.id === requestInfo.id); // TODO: o(1)로 바꾸기
      const frontArr = queue.slice(0, index);
      const backArr = queue.slice(index + 1);
      return index > -1 ? [...frontArr, ...backArr] : queue;
    },
    [],
  );

  // 우선순위큐 만들고 id 별로 obj를 만들고, 안에 []를 만들어서 하나씩 빼준다.
  // 인덱스 타워??
  // 각 요청에 대한 boolean의 json 자료구조를 만들어서 관리
  // true면 건너뛰고
  // 마지막에 한 번에 filter로 정리
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
      removeFromQueue(kind: 'wait' | 'progress', requestInfo: QueueRequestObj) {
        if (kind === 'wait') {
          setWaitingQueue(removeFromQueueCallback(requestInfo));
        } else {
          setInProgressQueue(removeFromQueueCallback(requestInfo));
        }
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
