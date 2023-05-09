import $ from './style.module.scss';

type Props = {
  title: string;
  children: React.ReactNode;
};

function MainContent({ title, children }: Props) {
  return (
    <div className={$['content']}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default MainContent;
