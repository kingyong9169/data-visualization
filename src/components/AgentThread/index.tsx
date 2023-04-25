import Select from '../Select';
import SubTitle from '../SubTitle';

import $ from './style.module.scss';
import useAgentThreadChart from './chart';
import { threadKindDatas, threadTypeDatas } from './constants';
import useAgentThread from './hooks';

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

export default function AgentThread() {
  const { threadType, kind, handleThreadKind, handleThreadType, data, title } =
    useAgentThread();
  const chartRef = useAgentThreadChart(data, {
    width: 700,
    height: 700,
    margin,
  });

  return (
    <div>
      <SubTitle text={title} />
      <Select
        datas={threadKindDatas}
        currentValue={kind}
        handleChange={handleThreadKind}
      />
      <Select
        datas={threadTypeDatas}
        currentValue={threadType}
        handleChange={handleThreadType}
      />
      <div ref={chartRef} className={$['agent-chart']} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
