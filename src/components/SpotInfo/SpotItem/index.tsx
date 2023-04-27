import $ from './style.module.scss';

type Props = { data: res.Success<res.Spot> };

export default function SpotItem({ data }: Props) {
  return (
    <div className={$['spot-item']}>
      <span className={$['spot-item-title']}>{data.name}</span>
      <span className={$['spot-item-data']}>{data.data}</span>
    </div>
  );
}
