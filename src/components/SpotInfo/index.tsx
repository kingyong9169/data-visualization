import useGetSpotInfo from 'src/hooks/api/useGetSpotInfo';
import { memo } from 'react';

import Infomatics from '../shared/Infomatics';

function SpotInfo() {
  const { data: actData, isLoading: actLoading } = useGetSpotInfo('act_agent');
  const { data: inactData, isLoading: inactLoading } =
    useGetSpotInfo('inact_agent');
  const { data: cpucoreData, isLoading: cpucoreLoading } =
    useGetSpotInfo('cpucore');
  const { data: hostData, isLoading: hostLoading } = useGetSpotInfo('host');

  const isAllLoading =
    actLoading || inactLoading || cpucoreLoading || hostLoading;

  const spotDatas = [actData, inactData, cpucoreData, hostData].map((data) =>
    data ? data : { key: '', name: '', data: 0 },
  );

  return (
    <>
      {isAllLoading ? <div>로딩중...</div> : <Infomatics datas={spotDatas} />}
    </>
  );
}

export default memo(SpotInfo);
