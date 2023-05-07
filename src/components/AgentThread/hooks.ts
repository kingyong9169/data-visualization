import React, { useEffect, useState } from 'react';
import {
  useAgentListAction,
  useAgentListValue,
} from 'src/store/AgentListProvider';

import { threadKindDatas, threadTypeDatas } from './constants';
import { refineAgentList } from './helpers';

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

export function useOids() {
  const { agents } = useAgentListValue();
  return agents.map(({ oid }) => oid).join(',');
}

export function useAgentListData(
  data: res.Success<res.AverageAgent> | res.Success<res.IndividualAgent> | null,
) {
  const agentDatas = refineAgentList(data);
  const { agentList } = useAgentListValue();
  const { setAgentList } = useAgentListAction();

  useEffect(() => {
    if (data && !agentList.length) setAgentList(agentDatas);
  }, [data]);
}
