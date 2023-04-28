import $ from './style.module.scss';

type Props = { data: res.Success<res.Spot> };

export default function InfoItem({ data }: Props) {
  return (
    <div className={$['info-item']}>
      <span className={$['info-item-title']}>{data.name}</span>
      <span className={$['info-item-data']}>{data.data}</span>
    </div>
  );
}
