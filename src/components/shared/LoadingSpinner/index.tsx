import $ from './style.module.scss';

type Props = {
  width?: number;
  borderWidth?: number;
  color?: string;
};

function LoadingSpinner({
  width = 64,
  borderWidth = 4,
  color = '#9ee2ff',
}: Props) {
  return (
    <div className={$.loading}>
      <div
        style={{
          width: `${width}px`,
          height: `${width}px`,
          borderWidth: `${borderWidth}px`,
          borderTopColor: color,
          borderRightColor: color,
          borderBottomColor: color,
        }}
        className={$.spinner}
      ></div>
    </div>
  );
}

export default LoadingSpinner;
