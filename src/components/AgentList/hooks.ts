import { useEffect } from 'react';
import {
  AgentListItem,
  useAgentListAction,
  useAgentListValue,
} from 'src/store/AgentListProvider';

export function useAgentList() {
  const { agents, agentList } = useAgentListValue();
  const { setAgents } = useAgentListAction();
  const isSelected = (agent: AgentListItem) =>
    agents.map(({ oid }) => oid).includes(agent.oid);

  const handleChange = (agent: AgentListItem) => {
    setAgents((agents) =>
      agents.map(({ oid }) => oid).includes(agent.oid)
        ? agents.filter(({ oid }) => oid !== agent.oid)
        : [...agents, agent],
    );
  };

  useEffect(() => {
    setAgents(agentList);
  }, [agentList]);

  return { agentList, agents, isSelected, handleChange };
}
