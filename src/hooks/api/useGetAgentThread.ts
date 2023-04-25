import { asyncKeys } from 'src/constants/asyncKeys';
import api from 'src/api';
import { HOUR } from 'src/constants/time';

import useAsync from '../useAsync';

function useGetAgentThread(type: string, kind?: string) {
  const refinedKind = kind ? `/${kind}` : '';
  return useAsync(asyncKeys.agentThread(type, kind || ''), () =>
    api.series<res.IndividualAgent | res.AverageAgent>(
      `${type}/{stime}/{etime}${refinedKind}`,
      {
        stime: Date.now() - HOUR,
        etime: Date.now(),
      },
    ),
  );
}

export default useGetAgentThread;
