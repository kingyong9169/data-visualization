import { SpotKind, useGetSpotInfos } from 'src/hooks/api/useGetSpotInfo';
import { memo, useState } from 'react';

import WidgetTemplate from '../shared/WidgetTemplate';

import { spotTransactionData, spotTransactionList } from './constants';

function SpotTransaction() {
  const [apis, setApis] = useState<SpotKind[]>(spotTransactionList);
  const { data, isLoading, error, reset } = useGetSpotInfos(apis);

  const spotDatas = data.map((data) =>
    data ? data : { key: '', name: '', data: 0 },
  );

  return (
    <WidgetTemplate
      title="트랜잭션 정보"
      chartType="infomatics"
      datas={spotDatas}
      apiOptions={spotTransactionData}
      apis={apis}
      setApis={setApis}
      {...{ isLoading, error, reset }}
    />
  );
}

export default memo(SpotTransaction);
