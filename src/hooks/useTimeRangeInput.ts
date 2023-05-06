import { useState } from 'react';

export type Time = {
  date: string;
  time: string;
};

export type HandleTime = (
  key: 'start' | 'end',
  type: 'date' | 'time',
) => (e: React.ChangeEvent<HTMLInputElement>) => void;

export function useTimeRangeInput() {
  const [start, setStart] = useState<Time>({ date: '', time: '' });
  const [end, setEnd] = useState<Time>({ date: '', time: '' });

  const handleTimeChange: HandleTime =
    (key: 'start' | 'end', type: 'date' | 'time') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const setState = key === 'start' ? setStart : setEnd;
      setState((prev) => ({ ...prev, [type]: e.target.value }));
    };

  return {
    start,
    end,
    handleTimeChange,
  };
}
