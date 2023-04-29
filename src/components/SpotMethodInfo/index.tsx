import useGetSpotInfo from 'src/hooks/api/useGetSpotInfo';
import { memo } from 'react';

import BarChart from '../shared/BarChart';

import $ from './style.module.scss';

const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const styles = {
  width: 300,
  height: 300,
  margin,
};

function SpotMethodInfo() {
  const { data: methodData, isLoading: methodLoading } =
    useGetSpotInfo('act_method');
  const { data: sqlData, isLoading: sqlLoading } = useGetSpotInfo('act_sql');
  const { data: httpcData, isLoading: httpcLoading } =
    useGetSpotInfo('act_httpc');
  const { data: dbcData, isLoading: dbcLoading } = useGetSpotInfo('act_dbc');
  const { data: socketData, isLoading: socketLoading } =
    useGetSpotInfo('act_socket');

  const isAllLoading =
    methodLoading || sqlLoading || httpcLoading || dbcLoading || socketLoading;

  const spotDatas = [methodData, sqlData, httpcData, dbcData, socketData].map(
    (data) => (data ? data : { key: '', name: '', data: 0 }),
  );

  return (
    <div className={$['container']}>
      {isAllLoading ? (
        <div>로딩중...</div>
      ) : (
        <BarChart datas={spotDatas} styles={styles} ticks={5} />
      )}
    </div>
  );
}

export default memo(SpotMethodInfo);
