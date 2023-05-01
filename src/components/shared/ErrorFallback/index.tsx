import $ from './style.module.scss';

type Props = {
  message: string;
  reset: () => void;
};

function ErrorFallback({ message = '에러가 발생했습니다.', reset }: Props) {
  return (
    <div className={$['error-fallback']}>
      <p className={$['error-message']}>{message}</p>
      <button className={$['reset-btn']} onClick={reset}>
        다시 시도
      </button>
    </div>
  );
}

export default ErrorFallback;
