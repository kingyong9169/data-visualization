import usePollingController from './hooks/usePollingController';
import DashBoard from './pages/dashboard';

function App() {
  usePollingController();

  return <DashBoard />;
}

export default App;
