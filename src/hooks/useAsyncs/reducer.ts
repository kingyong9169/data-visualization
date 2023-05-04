import { InitialAction, InitialState } from './type';

export function reducer<D, E>(
  state: InitialState<D, E>,
  action: InitialAction<D, E>,
) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: action.loading,
        data: action.data,
        errorInfos: action.errorInfos,
        error: null,
      };
    case 'FETCHING':
      return {
        ...state,
        fetching: action.fetching,
        errorInfos: action.errorInfos,
        data: state.data?.every((d) => !!d) ? state.data : action.data,
        error: null,
      };
    case 'PART_SUCCESS':
      return {
        ...state,
        loading: action.loadingCb
          ? action.loadingCb(state.loading)
          : state.loading,
        fetching: action.fetchingCb
          ? action.fetchingCb(state.fetching)
          : state.fetching,
        data: action.dataCb(state.data),
        error: null,
      };
    case 'ERROR':
      return {
        loading: action.loading,
        fetching: action.fetching,
        data: action.errorCb(state.data),
        error: action.error,
        errorInfos: action.errorInfosCb(state.errorInfos),
      };
    case 'ERROR_RESET':
      return {
        ...state,
        loading: action.loading,
        fetching: action.fetching,
        error: null,
      };
    default:
      throw new Error(`[Unhandled action type]: ${action}`);
  }
}
