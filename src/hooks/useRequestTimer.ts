import { useEffect } from 'react';
import { useTimeControlValue } from 'src/store/TimeControlProvider';

type TimerOptions = {
  dismissCondition?: boolean;
};

export function useRequestTimer(
  deps: unknown[],
  request: () => void,
  options: TimerOptions = {},
) {
  const { pollingTime } = useTimeControlValue();
  const { dismissCondition } = options;

  useEffect(() => {
    if (dismissCondition) return;
    const timer = setTimeout(() => {
      request();
    }, pollingTime);
    return () => clearTimeout(timer);
  }, [...deps, pollingTime]);
}
