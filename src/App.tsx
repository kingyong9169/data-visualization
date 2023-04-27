import $ from '@styles/app.module.scss';

import AgentThread from './components/AgentThread';
import ProjectStatistics from './components/ProjectStatistics';
import SpotInfo from './components/SpotInfo';
import usePollingController from './hooks/usePollingController';

function App() {
  usePollingController();

  return (
    <main className={$['container']}>
      <SpotInfo />
      <AgentThread />
      <ProjectStatistics />
    </main>
  );
}

export default App;
