import $ from './style.module.scss';

type Props = {
  text: string;
};

export default function SubTitle({ text }: Props) {
  return <h2 className={$['sub-title']}>{text}</h2>;
}
