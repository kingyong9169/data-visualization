import { asyncKeys } from 'src/constants/asyncKeys';
import { HOUR } from 'src/constants/time';
import { AgentKind } from 'src/components/AgentThread/hooks';

import useAsync from '../useAsync';

function useGetAgentThread(type: string, kind?: AgentKind) {
  const refinedKind = kind === 'avg' ? `/${kind}` : '';
  const key = `${type}/{stime}/{etime}${refinedKind}`;
  return useAsync<
    res.Success<res.AverageAgent> | res.Success<res.IndividualAgent>
  >(asyncKeys.agentThread(type, kind || ''), {
    id: Math.random(),
    type: 'json',
    key,
    needStime: true,
    needEtime: true,
    term: HOUR,
  });
}

export default useGetAgentThread;
