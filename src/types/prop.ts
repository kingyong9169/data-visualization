import { CSSProperties, ReactNode } from 'react';

export type StyleProps = {
  className?: string;
  style?: CSSProperties;
};

export type DefaultProps = {
  children?: ReactNode;
} & StyleProps;

export type DefaultData = {
  id: string;
  name: string;
};

export type IconProps = {
  size: number;
  fill?: string;
  stroke?: string;
  style?: React.CSSProperties;
};
