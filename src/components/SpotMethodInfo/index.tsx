import { useGetSpotInfos } from 'src/hooks/api/useGetSpotInfo';
import { memo } from 'react';
import { styles } from 'src/constants/chartStyles';

import BarChart from '../shared/BarChart';
import ErrorFallback from '../shared/ErrorFallback';
import LoadingSpinner from '../shared/LoadingSpinner';

import $ from './style.module.scss';

function SpotMethodInfo() {
  const { data, isLoading, error, reset } = useGetSpotInfos([
    'act_method',
    'act_sql',
    'act_httpc',
    'act_dbc',
    'act_socket',
  ]);

  const spotDatas = data.map((data) =>
    data ? data : { key: '', name: '', data: 0 },
  );

  return (
    <div className={$['container']}>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorFallback message={error.message} reset={reset} />}
      {!isLoading && !error && (
        <BarChart datas={spotDatas} styles={styles} ticks={5} />
      )}
    </div>
  );
}

export default memo(SpotMethodInfo);
