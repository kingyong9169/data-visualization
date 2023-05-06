import React from 'react';

import $ from './style.module.scss';

type Props = {
  datas: { name: string; value: string }[];
  currentValue: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({ datas, currentValue, handleChange }: Props) {
  return (
    <select
      onChange={handleChange}
      value={currentValue}
      className={$['select']}
    >
      {datas.map(({ name, value }) => (
        <option key={name} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
}
