import $ from '@styles/app.module.scss';
import { useState } from 'react';

import usePollingController from './hooks/usePollingController';
import DashBoard from './pages/DashBoard';
import NavBar from './components/shared/NavBar';
import { PageMenu, pageMenu } from './constants/pageMenu';
import ProjectStatistics from './components/ProjectStatistics';

const navMenuComponents = [<DashBoard />, <ProjectStatistics />];

function createSameLengthRoutes<T, U>(menuList: T[], menuComponents: U[]) {
  if (menuList.length !== menuComponents.length)
    throw new Error('The arrays must have the same length');
  return pageMenu.map((menu, index) => ({
    ...menu,
    component: menuComponents[index],
  }));
}

function App() {
  const [menu, setMenu] = useState<PageMenu>(pageMenu[0]);
  const handleChange = (page: PageMenu) =>
    setMenu((prev) => (prev.menu !== page.menu ? page : prev));

  usePollingController();

  return (
    <div className={$['root']}>
      <NavBar options={pageMenu} onChange={handleChange} selected={menu} />
      <div className={$['content']}>
        <h1>{menu.title}</h1>
        <main className={$['container']}>
          {
            createSameLengthRoutes(pageMenu, navMenuComponents).find(
              (route) => route.menu === menu.menu,
            )?.component
          }
        </main>
      </div>
    </div>
  );
}

export default App;
