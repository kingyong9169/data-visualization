import { pageMenu } from 'src/constants/pageMenu';

type ComponentByMenu<T> = {
  component: T;
  title: string;
  menu: string;
};

export function createSameLengthRoutes<T, U>(
  menuList: T[],
  menuComponents: U[],
): ComponentByMenu<U>[] {
  if (menuList.length !== menuComponents.length)
    throw new Error('The arrays must have the same length');
  return pageMenu.map((menu, index) => ({
    ...menu,
    component: menuComponents[index],
  }));
}

export function getRouteByMenu<U>(
  components: ComponentByMenu<U>[],
  menu: string,
) {
  return components.find((route) => route.menu === menu)?.component;
}
