import $ from './style.module.scss';
import AgentName from './AgentName';
import { useAgentList } from './hooks';

function AgentList() {
  const { agentList, isSelected, handleChange } = useAgentList();
  return (
    <div className={$['agent-list']}>
      {agentList.length
        ? agentList.map((data) => (
            <AgentName
              key={data.oid}
              data={data}
              isSelected={isSelected(data)}
              onChange={handleChange}
            />
          ))
        : null}
    </div>
  );
}

export default AgentList;
