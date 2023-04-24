import React, { useState } from 'react';
import useAgentThread from 'src/hooks/api/useAgentThread';

import Select from '../Select';
import SubTitle from '../SubTitle';

import { threadKindDatas, threadTypeDatas } from './constants';

export default function AgentThread() {
  const [threadType, setThreadType] = useState('thread_count');
  const [kind, setKind] = useState('');
  const { data, isLoading, error } = useAgentThread(threadType, kind);

  const handleThreadType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setThreadType(e.target.value);
  const handleThreadKind = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setKind(e.target.value);

  return (
    <div>
      <SubTitle text={data?.name || '로딩 중'} />
      <Select
        datas={threadTypeDatas}
        currentValue={threadType}
        handleChange={handleThreadType}
      />
      <Select
        datas={threadKindDatas}
        currentValue={kind}
        handleChange={handleThreadKind}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
