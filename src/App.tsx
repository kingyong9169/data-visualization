import $ from '@styles/app.module.scss';

import usePollingController from './hooks/usePollingController';
import DashBoard from './pages/DashBoard';
import NavBar from './components/shared/NavBar';
import { pageMenu } from './constants/pageMenu';
import Project from './pages/Project';
import MainContent from './components/shared/MainContent';
import { useAppContent } from './hooks/useAppContent';
import {
  createSameLengthRoutes,
  getRouteByMenu,
} from './utils/getRouteByMenu';

const navMenuComponents = [<DashBoard />, <Project />];

function App() {
  const { menu, handleChange } = useAppContent();
  usePollingController();

  return (
    <div className={$['root']}>
      <NavBar options={pageMenu} onChange={handleChange} selected={menu} />
      <MainContent title={menu.title}>
        {getRouteByMenu(
          createSameLengthRoutes(pageMenu, navMenuComponents),
          menu.menu,
        )}
      </MainContent>
    </div>
  );
}

export default App;
