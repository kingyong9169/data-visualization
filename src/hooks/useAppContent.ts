import { useState } from 'react';
import { PageMenu, pageMenu } from 'src/constants/pageMenu';

export function useAppContent() {
  const [menu, setMenu] = useState<PageMenu>(pageMenu[0]);
  const handleChange = (page: PageMenu) =>
    setMenu((prev) => (prev.menu !== page.menu ? page : prev));
  return { menu, handleChange };
}
