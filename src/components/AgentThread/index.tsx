import { memo } from 'react';
import { useTimeRangeInput } from 'src/hooks/useTimeRangeInput';

import LineGraphTemplate from '../shared/LineGraphTemplate';
import Select from '../shared/Select';
import TimeRangeInput from '../shared/TimeRangeInput';

import { threadKindDatas, threadTypeDatas } from './constants';
import { useAgentThread } from './hooks';
import { refinedData } from './helpers';

function AgentThread() {
  const { start, end, startDate, endDate, handleTimeChange } =
    useTimeRangeInput();
  const {
    threadType,
    kind,
    handleThreadKind,
    handleThreadType,
    data,
    isLoading,
    error,
    reset,
    title,
  } = useAgentThread({ sTime: startDate, eTime: endDate });
  const datas = refinedData(data);

  return (
    <LineGraphTemplate {...{ title, isLoading, error, datas, reset }}>
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
      <TimeRangeInput {...{ start, end }} onChange={handleTimeChange} />
    </LineGraphTemplate>
  );
}

export default memo(AgentThread);
