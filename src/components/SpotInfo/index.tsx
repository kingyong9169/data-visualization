import useGetSpotInfo from 'src/hooks/api/useGetSpotInfo';
import { memo } from 'react';

import Infomatics from '../shared/Infomatics';
import ErrorFallback from '../shared/ErrorFallback';
import LoadingSpinner from '../shared/LoadingSpinner';

function SpotInfo() {
  const {
    data: actData,
    isLoading: actLoading,
    error: actError,
    reset: actReset,
  } = useGetSpotInfo('act_agent');
  const {
    data: inactData,
    isLoading: inactLoading,
    error: inactError,
    reset: inactReset,
  } = useGetSpotInfo('inact_agent');
  const {
    data: cpucoreData,
    isLoading: cpucoreLoading,
    error: cpucoreError,
    reset: cpucoreReset,
  } = useGetSpotInfo('cpucore');
  const {
    data: hostData,
    isLoading: hostLoading,
    error: hostError,
    reset: hostReset,
  } = useGetSpotInfo('host');

  const isAllLoading =
    actLoading || inactLoading || cpucoreLoading || hostLoading;
  const errorExist = actError || inactError || cpucoreError || hostError;
  const reset = () => {
    actReset();
    inactReset();
    cpucoreReset();
    hostReset();
  };

  const spotDatas = [actData, inactData, cpucoreData, hostData].map((data) =>
    data ? data : { key: '', name: '', data: 0 },
  );

  return (
    <>
      {isAllLoading && <LoadingSpinner />}
      {errorExist && (
        <ErrorFallback message={errorExist.message} reset={reset} />
      )}
      {!isAllLoading && !errorExist && <Infomatics datas={spotDatas} />}
    </>
  );
}

export default memo(SpotInfo);
