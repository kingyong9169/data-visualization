import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
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

type PollingContext = {
  waitingQueue: QueueRequestObj[];
  inProgressQueue: QueueRequestObj[];
  activeRequestNum: number;
  setActiveRequestNum: Dispatch<SetStateAction<number>>;
  setQueue: (kind: 'wait' | 'progress', queue: QueueRequestObj[]) => void;
  addToQueue: (kind: 'wait' | 'progress', requestInfo: QueueRequestObj) => void;
  removeFromQueue: (
    kind: 'wait' | 'progress',
    requestInfo: QueueRequestObj,
  ) => void;
  queueRequest: (request: QueueRequestObj) => void;
};

const ApiPollingContext = createContext<PollingContext>({
  waitingQueue: [],
  inProgressQueue: [],
  activeRequestNum: 0,
  setActiveRequestNum: () => {},
  setQueue: () => {},
  addToQueue: () => {},
  removeFromQueue: () => {},
  queueRequest: () => ({
    onSuccess: () => {},
    onError: () => {},
  }),
});

type Props = {
  children: JSX.Element;
};

function ApiPollingProvider({ children }: Props): JSX.Element {
  const [activeRequestNum, setActiveRequestNum] = useState(0);
  const [waitingQueue, setWaitingQueue] = useState<QueueRequestObj[]>([]);
  const [inProgressQueue, setInProgressQueue] = useState<QueueRequestObj[]>([]);

  const setQueue = (kind: 'wait' | 'progress', queue: QueueRequestObj[]) => {
    if (kind === 'wait') {
      setWaitingQueue(queue);
    } else {
      setInProgressQueue(queue);
    }
  };

  const addToQueue = (
    kind: 'wait' | 'progress',
    requestInfo: QueueRequestObj,
  ) => {
    if (kind === 'wait') {
      setWaitingQueue((queue) => [...queue, requestInfo]);
    } else {
      setInProgressQueue((queue) => [...queue, requestInfo]);
    }
  };

  const removeFromQueueCallback =
    (requestInfo: QueueRequestObj) => (queue: QueueRequestObj[]) => {
      const index = queue.findIndex((item) => item.id === requestInfo.id);
      const frontArr = queue.slice(0, index);
      const backArr = queue.slice(index + 1);
      return index > -1 ? [...frontArr, ...backArr] : queue;
    };

  const removeFromQueue = (
    kind: 'wait' | 'progress',
    requestInfo: QueueRequestObj,
  ) => {
    if (kind === 'wait') {
      setWaitingQueue(removeFromQueueCallback(requestInfo));
    } else {
      setInProgressQueue(removeFromQueueCallback(requestInfo));
    }
  };

  const queueRequest = (request: QueueRequestObj) => {
    addToQueue('wait', request);
  };

  return (
    <ApiPollingContext.Provider
      value={{
        waitingQueue,
        inProgressQueue,
        activeRequestNum,
        setActiveRequestNum,
        setQueue,
        addToQueue,
        removeFromQueue,
        queueRequest,
      }}
    >
      {children}
    </ApiPollingContext.Provider>
  );
}

function useApiPolling(): PollingContext {
  const context = useContext(ApiPollingContext);
  if (context === undefined) {
    throw new Error(
      'useApiRequestPolling must be used within a ApiRequestPollingProvider',
    );
  }
  return context;
}

export { ApiPollingContext, ApiPollingProvider, useApiPolling };
