import AgentThread from 'src/components/AgentThread';
import SpotInfo from 'src/components/SpotInfo';
import SpotMethodInfo from 'src/components/SpotMethodInfo';
import SpotTransaction from 'src/components/SpotTransaction';

function DashBoard() {
  return (
    <>
      <SpotInfo />
      <SpotMethodInfo />
      <AgentThread />
      <SpotTransaction />
    </>
  );
}

export default DashBoard;
