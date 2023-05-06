import AgentList from 'src/components/AgentList';
import { AgentListProvider } from 'src/components/AgentList/AgentListProvider';
import AgentThread from 'src/components/AgentThread';
import SpotInfo from 'src/components/SpotInfo';
import SpotMethodInfo from 'src/components/SpotMethodInfo';
import SpotTransaction from 'src/components/SpotTransaction';
import Layout from 'src/components/shared/Layout';

function DashBoard() {
  return (
    <AgentListProvider>
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
