import AgentList from 'src/components/AgentList';
import { AgentListProvider } from 'src/store/AgentListProvider';
import AgentThread from 'src/components/AgentThread';
import SpotInfo from 'src/components/SpotInfo';
import SpotMethodInfo from 'src/components/SpotMethodInfo';
import SpotTransaction from 'src/components/SpotTransaction';
import Layout from 'src/components/shared/Layout';
import TimeControl from 'src/components/shared/TimeControl';

function DashBoard() {
  return (
    <AgentListProvider>
      <TimeControl />
      <AgentList />
      <Layout>
        <SpotInfo />
        <SpotMethodInfo />
        <AgentThread />
        <SpotTransaction />
      </Layout>
    </AgentListProvider>
  );
}

export default DashBoard;
