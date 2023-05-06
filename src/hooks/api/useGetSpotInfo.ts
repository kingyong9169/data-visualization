import { asyncKeys } from 'src/constants/asyncKeys';

import useAsync from '../useAsync';
import useAsyncs from '../useAsyncs';

type SpotBasicKind = 'act_agent' | 'inact_agent' | 'host' | 'cpucore' | 'cpu';
type SpotTransactionKind = 'txcount' | 'tps' | 'user' | 'actx' | 'rtime';
type SpotDBCKind = 'dbc_count' | 'dbc_active' | 'dbc_idle';
type SpotMethodKind =
  | 'act_method'
  | 'act_sql'
  | 'act_httpc'
  | 'act_dbc'
  | 'act_socket';

export type SpotKind =
  | SpotBasicKind
  | SpotTransactionKind
  | SpotDBCKind
  | SpotMethodKind;

function useGetSpotInfo(url: SpotKind) {
  return useAsync<res.Success<res.Spot>>(asyncKeys.spot(url), {
    type: '',
    key: url,
  });
}

export function useGetSpotInfos(urls: SpotKind[]) {
  return useAsyncs<res.Success<res.Spot>>(
    asyncKeys.spots(urls),
    urls.map((url) => ({
      type: '',
      key: url,
    })),
  );
}

export default useGetSpotInfo;
