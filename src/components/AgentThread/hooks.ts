import React, { useState } from 'react';
import useGetAgentThread from 'src/hooks/api/useGetAgentThread';

import { threadKindDatas, threadTypeDatas } from './constants';
import { useAgentThreadIndividualChart, useAgentThreadAvgChart } from './chart';

export function useAgentThread() {
  const [threadType, setThreadType] = useState('thread_count');
  const [kind, setKind] = useState('');
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
    setKind(e.target.value);

  return {
    threadType,
    kind,
    handleThreadKind,
    handleThreadType,
    title: `${kindTitle} ${typeTitle}`,
    ...datas,
  };
}

export function useAgentGraphKind(kind: string) {
  if (kind === 'avg') return useAgentThreadAvgChart;
  return useAgentThreadIndividualChart;
}
