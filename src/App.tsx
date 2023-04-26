import AgentThread from './components/\bAgentThread';
import usePollingController from './hooks/usePollingController';

function App() {
  usePollingController();

  return (
    <main style={{ padding: 20 }}>
      <AgentThread />
      <AgentThread />
      <AgentThread />
      <AgentThread />
      <AgentThread />
    </main>
  );
}

export default App;
