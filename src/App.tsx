import AgentThread from './components/\bAgentThread';
import ProjectStatistics from './components/ProjectStatistics';
import usePollingController from './hooks/usePollingController';

function App() {
  usePollingController();

  return (
    <main style={{ padding: 20 }}>
      <AgentThread />
      <ProjectStatistics />
    </main>
  );
}

export default App;
