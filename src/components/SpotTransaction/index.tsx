import useGetSpotInfo from 'src/hooks/api/useGetSpotInfo';
import { memo } from 'react';

import Infomatics from '../shared/Infomatics';
import ErrorFallback from '../shared/ErrorFallback';

function SpotTransaction() {
  const {
    data: txData,
    isLoading: txLoading,
    error: txError,
    reset: txReset,
  } = useGetSpotInfo('txcount');
  const {
    data: tpsData,
    isLoading: tpsLoading,
    error: tpsError,
    reset: tpsReset,
  } = useGetSpotInfo('tps');
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
    reset: userReset,
  } = useGetSpotInfo('user');
  const {
    data: actxData,
    isLoading: actxLoading,
    error: actxError,
    reset: actxReset,
  } = useGetSpotInfo('actx');
  const {
    data: rtimeData,
    isLoading: rtimeLoading,
    error: rtimeError,
    reset: rtimeReset,
  } = useGetSpotInfo('rtime');

  const isAllLoading =
    txLoading || tpsLoading || userLoading || actxLoading || rtimeLoading;
  const errorExist =
    txError || tpsError || userError || actxError || rtimeError;
  const reset = () => {
    txReset();
    tpsReset();
    userReset();
    actxReset();
    rtimeReset();
  };

  const spotDatas = [txData, tpsData, userData, actxData, rtimeData].map(
    (data) => (data ? data : { key: '', name: '', data: 0 }),
  );

  return (
    <>
      {isAllLoading && <div>로딩중...</div>}
      {!isAllLoading && !errorExist && <Infomatics datas={spotDatas} />}
      {errorExist && (
        <ErrorFallback message={errorExist.message} reset={reset} />
      )}
    </>
  );
}

export default memo(SpotTransaction);
