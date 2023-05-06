import { useGetAgentList } from 'src/hooks/api/useGetAgentList';

import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorFallback from '../shared/ErrorFallback';

import $ from './style.module.scss';
import AgentName from './AgentName';
import { useAgentList } from './hooks';

function AgentList() {
  const { data, isLoading, error, reset } = useGetAgentList();
  const { datas, isSelected, handleChange } = useAgentList(data);

  return (
    <div className={$['agent-list']}>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorFallback message={error.message} reset={reset} />}
      {!isLoading &&
        !error &&
        datas?.map((data) => (
          <AgentName
            key={data}
            name={data}
            isSelected={isSelected(data)}
            onChange={handleChange}
          />
        ))}
    </div>
  );
}

export default AgentList;
