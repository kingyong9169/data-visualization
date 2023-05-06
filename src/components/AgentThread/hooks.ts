import React, { useState } from 'react';

import { threadKindDatas, threadTypeDatas } from './constants';

export type AgentKind = 'avg' | '';

export function useAgentThread() {
  const [type, setType] = useState('thread_count');
  const [kind, setKind] = useState<AgentKind>('');
  const typeTitle =
    threadTypeDatas.find(({ value }) => value === type)?.name ||
    threadTypeDatas[0].name;
  const kindTitle =
    threadKindDatas.find(({ value }) => value === kind)?.name ||
    threadKindDatas[0].name;

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setType(e.target.value);
  const handleKind = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setKind(e.target.value as AgentKind);

  return {
    type,
    kind,
    handleKind,
    handleType,
    title: `${kindTitle} ${typeTitle}`,
  };
}
