import { DefaultData } from 'src/types/prop';

export const getSelectedMenus = (
  menus: DefaultData[],
  selectedMenuIds: DefaultData['id'][],
): DefaultData['id'][] => {
  return menus.reduce((acc, { id }) => {
    if (selectedMenuIds.includes(id)) {
      return [...acc, id];
    }
    return acc;
  }, [] as DefaultData['id'][]);
};
