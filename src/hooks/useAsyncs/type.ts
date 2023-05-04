export type InitialState<D, E> = {
  isLoading: boolean;
  isFetching: boolean;
  dataCandidate: D[];
  data: D[] | null;
  error: E | null;
};

type LoadingAction<T> = {
  type: 'LOADING';
  dataCandidate: T[];
};

type FetchingAction<T> = {
  type: 'FETCHING';
  dataCandidate: T[];
};

type PartSuccessAction<D, E> = {
  type: 'PART_SUCCESS';
  dataCallback: (data: InitialState<D, E>['dataCandidate']) => D[];
};

type SuccessAction<T> = {
  type: 'SUCCESS';
  data: T[];
  dataCandidate: T[];
};

type ErrorAction<E> = {
  type: 'ERROR';
  error: E;
};

type ErrorResetAction<T> = {
  type: 'ERROR_RESET';
  dataCandidate: T[];
};

export type InitialAction<D, E> =
  | LoadingAction<D>
  | FetchingAction<D>
  | SuccessAction<D>
  | PartSuccessAction<D, E>
  | ErrorAction<E>
  | ErrorResetAction<D>;

export type ReducerFn<D, E> = (
  states: InitialState<D, E>,
  action: InitialAction<D, E>,
) => InitialState<D, E>;
