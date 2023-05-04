import { QueryItem } from 'src/store/ApiRequestPollingContext';

export type InitialState<D, E> = {
  loading: boolean[];
  fetching: boolean[];
  data: D[];
  error: E | null;
};

type LoadingAction<T> = {
  type: 'LOADING';
  loading: boolean[];
  data: T[];
};

type FetchingAction<T> = {
  type: 'FETCHING';
  fetching: boolean[];
  data: T[];
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
  data: D[];
  error: E;
};

type ErrorResetAction<D> = {
  type: 'ERROR_RESET';
  loading: boolean[];
  fetching: boolean[];
  data: D[];
};

export type InitialAction<D, E> =
  | LoadingAction<D>
  | FetchingAction<D>
  | SuccessAction<D>
  | PartSuccessAction<D, E>
  | ErrorAction<D, E>
  | ErrorResetAction<D>;

export type ReducerFn<D, E> = (
  states: InitialState<D, E>,
  action: InitialAction<D, E>,
) => InitialState<D, E>;

export type AsyncInfo = QueryItem & {
  needStime?: boolean;
  needEtime?: boolean;
  term?: number;
};

export type AsyncOptions<D> = {
  select?: (state: D, data: D) => D;
  lastEtime?: (state: D | null) => number;
  skip?: boolean;
};
