import Select from '../Select';
import SubTitle from '../SubTitle';

import $ from './style.module.scss';
import useAgentThreadChart from './chart';
import { threadKindDatas, threadTypeDatas } from './constants';
import useAgentThread from './hooks';

export default function AgentThread() {
  const { threadType, kind, handleThreadKind, handleThreadType, data, title } =
    useAgentThread();
  const charRef = useAgentThreadChart(data);

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
      <div ref={charRef} className={$['agent-chart']} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
