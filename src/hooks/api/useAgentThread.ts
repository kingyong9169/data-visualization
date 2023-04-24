import { asyncKeys } from 'src/constants/asyncKeys';
import api from 'src/api';
import { MIN_10 } from 'src/constants/time';

import useAsync from '../useAsync';

function useAgentThread(type: string, kind?: string) {
  const refinedKind = kind ? `/${kind}` : '';
  return useAsync(asyncKeys.agentThread(type, kind || ''), () =>
    api.series<res.IndividualAgent>(`${type}/{stime}/{etime}${refinedKind}`, {
      stime: Date.now() - MIN_10,
      etime: Date.now(),
    }),
  );
}

export default useAgentThread;
