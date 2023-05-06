import $ from './style.module.scss';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <main className={$['container']}>{children}</main>;
}
