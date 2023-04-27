import useGetSpotInfo from 'src/hooks/api/useGetSpotInfo';

import $ from './style.module.scss';
import SpotItem from './SpotItem';

export default function SpotInfo() {
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
    <div className={$['spot-container']}>
      {isAllLoading ? (
        <div>로딩중...</div>
      ) : (
        spotDatas.map((data, idx) => (
          <SpotItem data={data} key={data.name + idx} />
        ))
      )}
    </div>
  );
}
