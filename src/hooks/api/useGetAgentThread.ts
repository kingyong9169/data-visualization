import { asyncKeys } from 'src/constants/asyncKeys';
import { HOUR } from 'src/constants/time';

import useAsync from '../useAsync';

function useGetAgentThread(type: string, kind?: string) {
  const refinedKind = kind ? `/${kind}` : '';
  const key = `${type}/{stime}/{etime}${refinedKind}`;
  const param = {
    stime: Date.now() - HOUR,
    etime: Date.now(),
  };
  return useAsync(asyncKeys.agentThread(type, kind || ''), {
    // TODO: 5초마다 param이 바뀌도록
    id: Math.random(),
    type: 'json',
    key,
    param,
  });
}

export default useGetAgentThread;
