import { useGetSpotInfos } from 'src/hooks/api/useGetSpotInfo';
import { memo } from 'react';

import Infomatics from '../shared/Infomatics';
import ErrorFallback from '../shared/ErrorFallback';
import LoadingSpinner from '../shared/LoadingSpinner';

function SpotTransaction() {
  const { data, isLoading, error, reset } = useGetSpotInfos([
    'txcount',
    'tps',
    'user',
    'actx',
    'rtime',
  ]);

  const spotDatas = data.map((data) =>
    data ? data : { key: '', name: '', data: 0 },
  );

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorFallback message={error.message} reset={reset} />}
      {!isLoading && !error && <Infomatics datas={spotDatas} />}
    </>
  );
}

export default memo(SpotTransaction);
