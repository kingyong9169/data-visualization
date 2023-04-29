import $ from '@styles/app.module.scss';

import AgentThread from './components/AgentThread';
import ProjectStatistics from './components/ProjectStatistics';
import SpotInfo from './components/SpotInfo';
import usePollingController from './hooks/usePollingController';
import SpotMethodInfo from './components/SpotMethodInfo';
import SpotTransaction from './components/SpotTransaction';

function App() {
  usePollingController();

  return (
    <main className={$['container']}>
      <SpotInfo />
      <SpotMethodInfo />
      <AgentThread />
      <ProjectStatistics />
      <SpotTransaction />
    </main>
  );
}

export default App;
