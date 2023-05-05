import { DefaultData } from 'src/types/prop';

import LoadingSpinner from '../LoadingSpinner';
import ErrorFallback from '../ErrorFallback';
import Infomatics from '../Infomatics';
import { Setting } from '../icons/Setting';
import CheckMenuList from '../CheckMenuList';
import SubTitle from '../SubTitle';

import $ from './style.module.scss';

type Props<T> = {
  title: string;
  apiOptions: DefaultData[];
  apis: T[];
  setApis: React.Dispatch<React.SetStateAction<T[]>>;
  datas: res.Success<number>[];
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
};

function WidgetTemplate<T extends string>(props: Props<T>) {
  const { apiOptions, datas, isLoading, error, reset } = props;
  const { title, apis, setApis } = props;

  const handleChange = (value: T) => {
    setApis((state) => {
      if (state.includes(value)) return state.filter((spot) => spot !== value);
      return [...state, value];
    });
  };

  return (
    <div className={$['container']}>
      <header className={$['header']}>
        <SubTitle text={title} />
        <CheckMenuList
          options={apiOptions}
          selected={apis}
          onChange={handleChange}
          name="spot-api-menus"
          direction="right"
          icon={<Setting size={24} stroke="#000" />}
        />
      </header>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorFallback message={error.message} reset={reset} />}
      {!isLoading && !error && <Infomatics datas={datas} />}
    </div>
  );
}

export default WidgetTemplate;
