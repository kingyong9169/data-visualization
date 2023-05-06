import { asyncKeys } from 'src/constants/asyncKeys';

import useAsync from '../useAsync';

export function useGetAgentList() {
  return useAsync<res.Success<res.AgentList>>(
    asyncKeys.agentList,
    {
      type: 'json',
      apiKind: 'agent',
      key: 'agents',
    },
    {
      timeSkip: true,
    },
  );
}
