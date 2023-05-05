import { SpotKind, useGetSpotInfos } from 'src/hooks/api/useGetSpotInfo';
import { memo, useState } from 'react';

import WidgetTemplate from '../shared/WidgetTemplate';

import { spotApiData, spotApiList } from './constants';

function SpotInfo() {
  const [spotApis, setSpotApis] = useState<SpotKind[]>(spotApiList);
  const { data, isLoading, error, reset } = useGetSpotInfos(spotApis);

  const spotDatas = data.map((data) =>
    data ? data : { key: '', name: '', data: 0 },
  );

  return (
    <WidgetTemplate
      apis={spotApis}
      setApis={setSpotApis}
      apiOptions={spotApiData}
      datas={spotDatas}
      {...{ isLoading, error, reset }}
    />
  );
}

export default memo(SpotInfo);
