import { SpotKind } from 'src/hooks/api/useGetSpotInfo';

export const spotTransactionList: SpotKind[] = [
  'txcount',
  'tps',
  'user',
  'actx',
  'rtime',
];

export const spotTransactionData = [
  {
    id: 'txcount',
    name: '트랜잭션 수',
  },
  {
    id: 'tps',
    name: '초당 트랜잭션 수',
  },
  {
    id: 'user',
    name: '5분간 고유 사용자 수',
  },
  {
    id: 'actx',
    name: '액티브 트랜잭션 수',
  },
  {
    id: 'rtime',
    name: '평균 응답 시간',
  },
];
