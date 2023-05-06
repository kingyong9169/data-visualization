import { createContext, useContext, useState } from 'react';

const AgentListValueContext = createContext({
  agents: [] as string[],
});

const AgentListActionContext = createContext({
  setAgents: {} as React.Dispatch<React.SetStateAction<string[]>>,
});

type Props = {
  children: React.ReactNode;
};

export function AgentListProvider({ children }: Props) {
  const [agents, setAgents] = useState<string[]>([]);

  return (
    <AgentListValueContext.Provider value={{ agents }}>
      <AgentListActionContext.Provider value={{ setAgents }}>
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
