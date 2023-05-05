import { useRef } from 'react';
import { DefaultData } from 'src/types/prop';

import $ from './style.module.scss';
import { useSelect } from './hooks';
import { getSelectedMenus } from './utils';

type Props<T> = {
  options: DefaultData[];
  selected: DefaultData['id'][];
  onChange?: (value: T) => void;
  name: string;
};

function CheckMenuList<T extends DefaultData['id']>(props: Props<T>) {
  const { name, options, selected, onChange } = props;
  const labelRef = useRef<HTMLButtonElement>(null);
  const [isClicked, setIsClicked] = useSelect(labelRef);
  const labelIds = getSelectedMenus(options, selected);
  const isSelected = (optionId: DefaultData['id']) =>
    labelIds.includes(optionId);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    setIsClicked((clicked) => !clicked);
  };

  const handleSelectItem = (option: DefaultData['id']) => () => {
    if (onChange) onChange(option as T);
  };

  return (
    <div className={$['select-box']}>
      <button
        id={`${name}-select-box`}
        type="button"
        ref={labelRef}
        aria-haspopup="true"
        aria-expanded={isClicked ? 'true' : 'false'}
        aria-controls={`${name}-select-list`}
        onClick={handleMouseDown}
      >
        선택
      </button>

      {isClicked && (
        <ul
          id={`${name}-select-list`}
          aria-labelledby={`${name}-select-box`}
          role="menu"
          tabIndex={0}
          className={$['select-wrapper']}
        >
          {options.map(({ name, id }) => (
            <li
              tabIndex={0}
              role="menuitem"
              key={name}
              className={`${$['select-item']} ${
                isSelected(id) && $['select-item-clicked']
              }`}
              onClick={handleSelectItem(id)}
              onKeyDown={handleSelectItem(id)}
            >
              <span>{name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CheckMenuList;
