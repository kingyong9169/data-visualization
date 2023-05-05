import { SpotKind, useGetSpotInfos } from 'src/hooks/api/useGetSpotInfo';
import { memo, useState } from 'react';

import Infomatics from '../shared/Infomatics';
import ErrorFallback from '../shared/ErrorFallback';
import LoadingSpinner from '../shared/LoadingSpinner';
import CheckMenuList from '../shared/CheckMenuList';
import SubTitle from '../shared/SubTitle';
import { Setting } from '../shared/icons/Setting';

import $ from './style.module.scss';
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
    <div className={$['container']}>
      <header className={$['header']}>
        <SubTitle text="애플리케이션 기본 정보" />
        <CheckMenuList
          options={spotApiData}
          selected={spotApis}
          onChange={handleChange}
          name="spot-api-menus"
          direction="right"
          icon={<Setting size={24} stroke="#000" />}
        />
      </header>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorFallback message={error.message} reset={reset} />}
      {!isLoading && !error && <Infomatics datas={spotDatas} />}
    </div>
  );
}

export default memo(SpotInfo);
