import { memo } from 'react';
import { useTimeRangeInput } from 'src/hooks/useTimeRangeInput';
import useGetAgentThread from 'src/hooks/api/useGetAgentThread';

import LineGraphTemplate from '../shared/LineGraphTemplate';
import Select from '../shared/Select';
import TimeRangeInput from '../shared/TimeRangeInput';

import { threadKindDatas, threadTypeDatas } from './constants';
import { useOids, useAgentThread, useAgentListData } from './hooks';
import { refinedData } from './helpers';

function AgentThread() {
  const { start, end, startDate, endDate, handleTimeChange } =
    useTimeRangeInput();
  const { type, kind, handleKind, handleType, title } = useAgentThread();
  const oids = useOids();
  const { data, isLoading, error, reset } = useGetAgentThread(type, kind, {
    sTime: startDate,
    eTime: endDate,
    oids,
  });
  useAgentListData(data);
  const datas = refinedData(data);

  return (
    <LineGraphTemplate {...{ title, isLoading, error, datas, reset }}>
      <Select
        datas={threadKindDatas}
        currentValue={kind}
        handleChange={handleKind}
      />
      <Select
        datas={threadTypeDatas}
        currentValue={type}
        handleChange={handleType}
      />
      <TimeRangeInput {...{ start, end }} onChange={handleTimeChange} />
    </LineGraphTemplate>
  );
}

export default memo(AgentThread);
