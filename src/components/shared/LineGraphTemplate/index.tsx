import { timeFormat } from 'd3';
import { styles } from 'src/constants/chartStyles';

import SubTitle from '../SubTitle';
import ErrorFallback from '../ErrorFallback';
import LoadingSpinner from '../LoadingSpinner';
import LineChart from '../LineChart';

import $ from './style.module.scss';

type Props = {
  children: React.ReactNode;
  title: string;
  datas: res.AgentData[][];
  isLoading: boolean;
  error: Error | null;
  reset: () => void;
};

export default function LineGraphTemplate(props: Props) {
  const { children, title, datas, isLoading, error, reset } = props;
  return (
    <div className={$['container']}>
      <SubTitle text={title} />
      {children}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorFallback message={error.message} reset={reset} />}
      {!isLoading && !error && (
        <LineChart
          datas={datas}
          styles={styles}
          xFormat={timeFormat('%H:%M')}
        />
      )}
    </div>
  );
}
