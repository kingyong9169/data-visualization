import { PageMenu } from 'src/constants/pageMenu';

import $ from './style.module.scss';

type Props = {
  options: PageMenu[];
  onChange: (menu: PageMenu) => void;
  selected: PageMenu;
};

export default function NavBar({ options, onChange, selected }: Props) {
  return (
    <nav className={$['nav-bar']}>
      <ul className={$['nav-bar-list']}>
        {options.map((option) => (
          <li key={option.menu} onClick={() => onChange(option)}>
            <button
              type="button"
              className={`${$['menu']} ${
                selected.menu === option.menu && $['menu-clicked']
              }`}
            >
              {option.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
