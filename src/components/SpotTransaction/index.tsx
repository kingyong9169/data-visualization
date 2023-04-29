import useGetSpotInfo from 'src/hooks/api/useGetSpotInfo';

import Infomatics from '../shared/Infomatics';

export default function SpotTransaction() {
  const { data: txData, isLoading: txLoading } = useGetSpotInfo('txcount');
  const { data: tpsData, isLoading: tpsLoading } = useGetSpotInfo('tps');
  const { data: userData, isLoading: userLoading } = useGetSpotInfo('user');
  const { data: actxData, isLoading: actxLoading } = useGetSpotInfo('actx');
  const { data: rtimeidleData, isLoading: rtimeLoading } =
    useGetSpotInfo('rtime');

  const isAllLoading =
    txLoading || tpsLoading || userLoading || actxLoading || rtimeLoading;

  const spotDatas = [txData, tpsData, userData, actxData, rtimeidleData].map(
    (data) => (data ? data : { key: '', name: '', data: 0 }),
  );

  return (
    <>
      {isAllLoading ? <div>로딩중...</div> : <Infomatics datas={spotDatas} />}
    </>
  );
}
