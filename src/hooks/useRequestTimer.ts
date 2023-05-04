import { useEffect } from 'react';
import { POLLING_DURATION } from 'src/constants/polling';

type TimerOptions = {
  dismissCondition?: boolean;
};

export function useRequestTimer(
  deps: unknown[],
  request: () => void,
  options: TimerOptions = {},
) {
  const { dismissCondition } = options;

  useEffect(() => {
    if (dismissCondition) return;
    const timer = setTimeout(() => {
      request();
    }, POLLING_DURATION); // TODO: 시간을 상태로 바꾸기
    return () => clearTimeout(timer);
  }, deps);
}
