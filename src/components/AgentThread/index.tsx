import Select from '../Select';
import SubTitle from '../SubTitle';

import $ from './style.module.scss';
import { threadKindDatas, threadTypeDatas } from './constants';
import { useAgentGraphKind, useAgentThread } from './hooks';

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

export default function AgentThread() {
  const { threadType, kind, handleThreadKind, handleThreadType, data, title } =
    useAgentThread();
  const useAgentChart = useAgentGraphKind(kind);
  const chartRef = useAgentChart(data, {
    width: 300,
    height: 300,
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
    </div>
  );
}
