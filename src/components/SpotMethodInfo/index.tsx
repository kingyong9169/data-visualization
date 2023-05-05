import { SpotKind, useGetSpotInfos } from 'src/hooks/api/useGetSpotInfo';
import { memo, useState } from 'react';

import WidgetTemplate from '../shared/WidgetTemplate';

import { spotMethodData, spotMethodList } from './constants';

function SpotMethodInfo() {
  const [apis, setApis] = useState<SpotKind[]>(spotMethodList);
  const { data, isLoading, error, reset } = useGetSpotInfos(apis);

  const spotDatas = data.map((data) =>
    data ? data : { key: '', name: '', data: 0 },
  );

  return (
    <WidgetTemplate
      title="메소드 정보"
      chartType="bar"
      datas={spotDatas}
      apiOptions={spotMethodData}
      apis={apis}
      setApis={setApis}
      {...{ isLoading, error, reset }}
    />
  );
}

export default memo(SpotMethodInfo);
