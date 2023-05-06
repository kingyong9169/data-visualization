import { useEffect } from 'react';

import { useAgentListAction, useAgentListValue } from './AgentListProvider';

export function useAgentList(data: res.Success<res.AgentList> | null) {
  const datas = data?.data.data.map(({ oname }) => oname);
  const { agents } = useAgentListValue();
  const { setAgents } = useAgentListAction();
  const isSelected = (agent: string) =>
    !agents.length || agents.includes(agent);

  const handleChange = (agent: string) => {
    setAgents((agents) =>
      agents.includes(agent)
        ? agents.filter((a) => a !== agent)
        : [...agents, agent],
    );
  };

  useEffect(() => {
    setAgents(datas || []);
  }, [data]);

  return { datas, agents, isSelected, handleChange };
}
