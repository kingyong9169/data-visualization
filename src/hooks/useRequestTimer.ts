import { useEffect } from 'react';

type TimerOptions = {
  dismissCondition?: boolean;
};

export function useRequestTimer(
  deps: unknown[],
  request: () => void,
  options: TimerOptions = {},
) {
  const { dismissCondition } = options;
  const duration = 5000;

  useEffect(() => {
    if (dismissCondition) return;
    const timer = setTimeout(() => {
      request();
    }, duration);
    return () => clearTimeout(timer);
  }, deps);
}
