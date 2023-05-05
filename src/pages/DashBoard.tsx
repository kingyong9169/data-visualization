import $ from '@styles/app.module.scss';
import AgentThread from 'src/components/AgentThread';
import SpotInfo from 'src/components/SpotInfo';
import SpotMethodInfo from 'src/components/SpotMethodInfo';
import SpotTransaction from 'src/components/SpotTransaction';

function DashBoard() {
  return (
    <>
      <h1>애플리케이션 대시보드</h1>
      <main className={$['container']}>
        <SpotInfo />
        <SpotMethodInfo />
        <AgentThread />
        <SpotTransaction />
      </main>
    </>
  );
}

export default DashBoard;
