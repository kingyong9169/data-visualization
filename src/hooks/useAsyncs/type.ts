import { AsyncInfo } from 'src/types/async';

export type InitialState<D, E> = {
  loading: boolean[];
  fetching: boolean[];
  data: D[];
  error: E | null;
  errorInfos: boolean[];
};

type LoadingAction<T> = {
  type: 'LOADING';
  loading: boolean[];
  data: T[];
  errorInfos: boolean[];
};

type FetchingAction<T> = {
  type: 'FETCHING';
  fetching: boolean[];
  errorInfos: boolean[];
};

type PartSuccessAction<D, E> = {
  type: 'PART_SUCCESS';
  loadingCb?: (state: InitialState<D, E>['loading']) => boolean[];
  fetchingCb?: (state: InitialState<D, E>['loading']) => boolean[];
  dataCb: (data: InitialState<D, E>['data']) => D[];
};

type SuccessAction<T> = {
  type: 'SUCCESS';
  loading: boolean[];
  fetching: boolean[];
  data: T[];
};

type ErrorAction<D, E> = {
  type: 'ERROR';
  loading: boolean[];
  fetching: boolean[];
  errorCb: (data: InitialState<D, E>['data']) => D[];
  error: E;
  errorInfosCb: (errors: InitialState<D, E>['errorInfos']) => boolean[];
};

type ErrorResetAction = {
  type: 'ERROR_RESET';
  loading: boolean[];
  fetching: boolean[];
};

export type InitialAction<D, E> =
  | LoadingAction<D>
  | FetchingAction<D>
  | SuccessAction<D>
  | PartSuccessAction<D, E>
  | ErrorAction<D, E>
  | ErrorResetAction;

export type ReducerFn<D, E> = (
  states: InitialState<D, E>,
  action: InitialAction<D, E>,
) => InitialState<D, E>;

export type MultiAsyncItem = Omit<AsyncInfo, 'sTime' | 'eTime'>;

export type AsyncInfoWithId = MultiAsyncItem & {
  idx: number;
};

export type AsyncOptions<D> = {
  select?: (state: D, data: D) => D;
  lastEtime?: (state: D) => number;
  skip?: boolean;
};

export type UseAsyncsResult<D, E> = {
  data: D[];
  error: E | null;
  isLoading: boolean;
  isFetching: boolean;
  reset: () => void;
};
