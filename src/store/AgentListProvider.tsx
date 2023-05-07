import { createContext, useContext, useState } from 'react';

export type AgentListItem = { oid: number; oname: string };

export type AgentListValue = AgentListItem[] | [];

const AgentListValueContext = createContext({
  agents: [] as AgentListValue,
  agentList: [] as AgentListValue,
});

const AgentListActionContext = createContext({
  setAgents: {} as React.Dispatch<React.SetStateAction<AgentListValue>>,
  setAgentList: {} as React.Dispatch<React.SetStateAction<AgentListValue>>,
});

type Props = {
  children: React.ReactNode;
};

export function AgentListProvider({ children }: Props) {
  const [agentList, setAgentList] = useState<AgentListValue>([]);
  const [agents, setAgents] = useState<AgentListValue>([]);

  return (
    <AgentListValueContext.Provider value={{ agentList, agents }}>
      <AgentListActionContext.Provider value={{ setAgents, setAgentList }}>
        {children}
      </AgentListActionContext.Provider>
    </AgentListValueContext.Provider>
  );
}

export function useAgentListAction() {
  const context = useContext(AgentListActionContext);
  if (context === undefined) {
    throw new Error(
      'useAgentListAction must be used within a AgentListActionContext',
    );
  }
  return context;
}

export function useAgentListValue() {
  const context = useContext(AgentListValueContext);
  if (context === undefined) {
    throw new Error(
      'useAgentListValue must be used within a AgentListValueContext',
    );
  }
  return context;
}
