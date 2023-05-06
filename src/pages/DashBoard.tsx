import AgentList from 'src/components/AgentList';
import AgentThread from 'src/components/AgentThread';
import SpotInfo from 'src/components/SpotInfo';
import SpotMethodInfo from 'src/components/SpotMethodInfo';
import SpotTransaction from 'src/components/SpotTransaction';
import Layout from 'src/components/shared/Layout';

function DashBoard() {
  return (
    <Layout>
      <AgentList />
      <SpotInfo />
      <SpotMethodInfo />
      <AgentThread />
      <SpotTransaction />
    </Layout>
  );
}

export default DashBoard;
