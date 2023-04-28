import $ from './style.module.scss';
import InfoItem from './InfoItem';

type Props = {
  datas: res.Success<number>[];
};

export default function Infomatics({ datas }: Props) {
  return (
    <div className={$['container']}>
      {datas.map((data, idx) => (
        <InfoItem data={data} key={data.name + idx} />
      ))}
    </div>
  );
}
