import { AsyncTimeParams } from 'src/types/async';

export const isTimeExist = (
  time: AsyncTimeParams,
): time is Required<AsyncTimeParams> => !!time.sTime && !!time.eTime;

export const getTimeDeps = (time: AsyncTimeParams) =>
  isTimeExist(time) ? time.sTime + time.eTime : 0;
