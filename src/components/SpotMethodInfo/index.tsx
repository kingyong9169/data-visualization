import useGetSpotInfo from 'src/hooks/api/useGetSpotInfo';
import { memo } from 'react';
import { styles } from 'src/constants/chartStyles';

import BarChart from '../shared/BarChart';
import ErrorFallback from '../shared/ErrorFallback';
import LoadingSpinner from '../shared/LoadingSpinner';

import $ from './style.module.scss';

function SpotMethodInfo() {
  const {
    data: methodData,
    isLoading: methodLoading,
    error: methodError,
    reset: methodReset,
  } = useGetSpotInfo('act_method');
  const {
    data: sqlData,
    isLoading: sqlLoading,
    error: sqlError,
    reset: sqlReset,
  } = useGetSpotInfo('act_sql');
  const {
    data: httpcData,
    isLoading: httpcLoading,
    error: httpcError,
    reset: httpcReset,
  } = useGetSpotInfo('act_httpc');
  const {
    data: dbcData,
    isLoading: dbcLoading,
    error: dbcError,
    reset: dbcReset,
  } = useGetSpotInfo('act_dbc');
  const {
    data: socketData,
    isLoading: socketLoading,
    error: socketError,
    reset: socketReset,
  } = useGetSpotInfo('act_socket');

  const isAllLoading =
    methodLoading || sqlLoading || httpcLoading || dbcLoading || socketLoading;
  const errorExist =
    methodError || sqlError || httpcError || dbcError || socketError;
  const reset = () => {
    methodReset();
    sqlReset();
    httpcReset();
    dbcReset();
    socketReset();
  };

  const spotDatas = [methodData, sqlData, httpcData, dbcData, socketData].map(
    (data) => (data ? data : { key: '', name: '', data: 0 }),
  );

  return (
    <div className={$['container']}>
      {isAllLoading && <LoadingSpinner />}
      {errorExist && (
        <ErrorFallback message={errorExist.message} reset={reset} />
      )}
      {!isAllLoading && !errorExist && (
        <BarChart datas={spotDatas} styles={styles} ticks={5} />
      )}
    </div>
  );
}

export default memo(SpotMethodInfo);
