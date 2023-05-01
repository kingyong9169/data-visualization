import { InitialAction, InitialState } from './type';

export function reducer<D, E>(
  state: InitialState<D, E>,
  action: InitialAction<D, E>,
) {
  switch (action.type) {
    case 'LOADING':
      return {
        isLoading: true,
        isFetching: false,
        data: null,
        error: null,
      };
    case 'FETCHING':
      return {
        isLoading: false,
        isFetching: true,
        data: state.data ? state.data : null,
        error: null,
      };
    case 'SUCCESS':
      return {
        isLoading: false,
        isFetching: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        isLoading: false,
        isFetching: false,
        data: null,
        error: action.error,
      };
    case 'ERROR_RESET':
      return {
        isLoading: false,
        isFetching: false,
        data: null,
        error: null,
      };
    default:
      throw new Error(`[Unhandled action type]: ${action}`);
  }
}
