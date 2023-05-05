import { SpotKind } from 'src/hooks/api/useGetSpotInfo';

export const spotMethodList: SpotKind[] = [
  'act_method',
  'act_sql',
  'act_httpc',
  'act_dbc',
  'act_socket',
];

export const spotMethodData = [
  {
    id: 'act_method',
    name: '액티브 Method 수',
  },
  {
    id: 'act_sql',
    name: '액티브 SQL 수',
  },
  {
    id: 'act_httpc',
    name: '액티브 HTTP Call 수',
  },
  {
    id: 'act_dbc',
    name: '액티브 DB Connection 수',
  },
  {
    id: 'act_socket',
    name: '액티브 Socket 수',
  },
];
