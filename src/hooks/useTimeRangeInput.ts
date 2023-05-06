import { useEffect, useState } from 'react';

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
  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<number>(0);

  const handleTimeChange: HandleTime =
    (key: 'start' | 'end', type: 'date' | 'time') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const setState = key === 'start' ? setStart : setEnd;
      setState((prev) => ({ ...prev, [type]: e.target.value }));
    };

  useEffect(() => {
    setStartDate(Number(new Date(`${start.date} ${start.time}`)));
  }, [start]);

  useEffect(() => {
    setEndDate(Number(new Date(`${end.date} ${end.time}`)));
  }, [end]);

  return {
    start,
    end,
    startDate,
    endDate,
    handleTimeChange,
  };
}
