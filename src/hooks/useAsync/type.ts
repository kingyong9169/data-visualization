export type InitialState<D, E> = {
  isLoading: boolean;
  isFetching: boolean;
  data: D | null;
  error: E | null;
};

type LoadingAction = {
  type: 'LOADING';
};

type FetchingAction = {
  type: 'FETCHING';
};

type SuccessAction<T> = {
  type: 'SUCCESS';
  data: T;
};

type ErrorAction<T> = {
  type: 'ERROR';
  error: T;
};

type ErrorResetAction = {
  type: 'ERROR_RESET';
};

export type InitialAction<D, E> =
  | LoadingAction
  | FetchingAction
  | SuccessAction<D>
  | ErrorAction<E>
  | ErrorResetAction;

export type ReducerFn<D, E> = (
  states: InitialState<D, E>,
  action: InitialAction<D, E>,
) => InitialState<D, E>;

export type AsyncOptions<D, E> = {
  select?: (state: InitialState<D, E>['data'], data: D) => D;
  lastEtime?: (state: InitialState<D, E>['data']) => number;
  skip?: boolean;
};
