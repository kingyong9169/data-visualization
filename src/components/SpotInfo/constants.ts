import { SpotKind } from 'src/hooks/api/useGetSpotInfo';

export const spotApiList: SpotKind[] = [
  'act_agent',
  'inact_agent',
  'cpucore',
  'host',
];

export const spotApiData = [
  {
    id: 'act_agent',
    name: '활성화 에이전트 수',
  },
  {
    id: 'inact_agent',
    name: '비활성화 에이전트 수',
  },
  {
    id: 'cpucore',
    name: 'CPU 코어 합',
  },
  {
    id: 'host',
    name: '호스트 수',
  },
];
