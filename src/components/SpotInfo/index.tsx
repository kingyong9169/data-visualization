import { SpotKind, useGetSpotInfos } from 'src/hooks/api/useGetSpotInfo';
import { memo, useState } from 'react';

import Infomatics from '../shared/Infomatics';
import ErrorFallback from '../shared/ErrorFallback';
import LoadingSpinner from '../shared/LoadingSpinner';
import CheckMenuList from '../shared/CheckMenuList';

import { spotApiData, spotApiList } from './constants';

function SpotInfo() {
  const [spotApis, setSpotApis] = useState<SpotKind[]>(spotApiList);
  const { data, isLoading, error, reset } = useGetSpotInfos(spotApis);

  const spotDatas = data.map((data) =>
    data ? data : { key: '', name: '', data: 0 },
  );

  const handleChange = (value: SpotKind) => {
    setSpotApis((state) => {
      if (state.includes(value)) return state.filter((spot) => spot !== value);
      return [...state, value];
    });
  };

  return (
    <>
      <CheckMenuList
        options={spotApiData}
        selected={spotApis}
        onChange={handleChange}
        name="spot-api-menus"
      />
      {isLoading && <LoadingSpinner />}
      {error && <ErrorFallback message={error.message} reset={reset} />}
      {!isLoading && !error && <Infomatics datas={spotDatas} />}
    </>
  );
}

export default memo(SpotInfo);
