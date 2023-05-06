import { QueryItem } from 'src/store/ApiRequestPollingContext';

export type AsyncTimeParams = {
  sTime?: number;
  eTime?: number;
};

export type AsyncInfo = QueryItem &
  AsyncTimeParams & {
    needStime?: boolean;
    needEtime?: boolean;
    term?: number;
    params?: Record<string, string | number>;
  };
