import { asyncKeys } from 'src/constants/asyncKeys';
import { HOUR } from 'src/constants/time';

import useAsync from '../useAsync';

type StatisticsType = 'raw' | 'tag';

type StatisticsKind =
  | 'app_counter/tps'
  | 'app_counter/resp_time'
  | 'app_host_resource/cpu'
  | 'db_pool_detail/dbconn';

function useProjectStatistics(type: StatisticsType, kind: StatisticsKind) {
  const refinedType = type === 'raw' ? 'raw' : '';
  const key = `tag/${kind}?stime={stime}&etime={etime}&timeMerge=avg`;
  return useAsync(asyncKeys.projectStatistics(type, kind), {
    id: Math.random(),
    type: refinedType,
    key,
    needStime: true,
    needEtime: true,
    term: HOUR,
  });
}

export default useProjectStatistics;
