import { DefaultData, StyleProps } from 'src/types/prop';

import $ from './style.module.scss';
import { useSelect } from './hooks';
import { getSelectedMenus } from './utils';

type Props<T> = {
  options: DefaultData[];
  selected: DefaultData['id'][];
  onChange?: (value: T) => void;
  icon?: JSX.Element;
  name: string;
  direction?: 'left' | 'right';
} & StyleProps;

function CheckMenuList<T extends DefaultData['id']>(props: Props<T>) {
  const { name, options, selected, onChange, className, direction, icon } =
    props;
  const right = direction === 'right' ? 0 : undefined;
  const left = direction === 'left' ? 0 : undefined;
  const { isClicked, setClicked, labelRef } = useSelect<HTMLButtonElement>();
  const labelIds = getSelectedMenus(options, selected);
  const isSelected = (optionId: DefaultData['id']) =>
    labelIds.includes(optionId);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => {
    e.preventDefault();
    setClicked((clicked) => !clicked);
  };

  const handleSelectItem = (option: DefaultData['id']) => () => {
    if (onChange) onChange(option as T);
  };

  return (
    <div className={`${$['select-box']} ${className}`}>
      <button
        id={`${name}-select-box`}
        type="button"
        ref={labelRef}
        aria-haspopup="true"
        aria-expanded={isClicked ? 'true' : 'false'}
        aria-controls={`${name}-select-list`}
        onClick={handleMouseDown}
      >
        {icon || '선택'}
      </button>

      {isClicked && (
        <ul
          id={`${name}-select-list`}
          aria-labelledby={`${name}-select-box`}
          role="menu"
          tabIndex={0}
          style={{ right, left }}
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
