import { asyncKeys } from 'src/constants/asyncKeys';
import { HOUR } from 'src/constants/time';

import useAsync from '../useAsync';

function useGetAgentThread(type: string, kind?: string) {
  const refinedKind = kind ? `/${kind}` : '';
  const key = `${type}/{stime}/{etime}${refinedKind}`;
  return useAsync(asyncKeys.agentThread(type, kind || ''), {
    id: Math.random(),
    type: 'json',
    key,
    needStime: true,
    needEtime: true,
    term: HOUR,
  });
}

export default useGetAgentThread;
