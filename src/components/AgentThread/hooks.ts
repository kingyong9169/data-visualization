import React, { useState } from 'react';
import useGetAgentThread from 'src/hooks/api/useGetAgentThread';

import { threadKindDatas, threadTypeDatas } from './constants';

export type AgentKind = 'avg' | '';

export function useAgentThread() {
  const [threadType, setThreadType] = useState('thread_count');
  const [kind, setKind] = useState<AgentKind>('');
  const datas = useGetAgentThread(threadType, kind);
  const typeTitle =
    threadTypeDatas.find(({ value }) => value === threadType)?.name ||
    threadTypeDatas[0].name;
  const kindTitle =
    threadKindDatas.find(({ value }) => value === kind)?.name ||
    threadKindDatas[0].name;

  const handleThreadType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setThreadType(e.target.value);
  const handleThreadKind = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setKind(e.target.value as AgentKind);

  return {
    threadType,
    kind,
    handleThreadKind,
    handleThreadType,
    title: `${kindTitle} ${typeTitle}`,
    ...datas,
  };
}
