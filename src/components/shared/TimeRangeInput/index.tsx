import { HandleTime, Time } from 'src/hooks/useTimeRangeInput';

import $ from './style.module.scss';

type Props = {
  start: Time;
  end: Time;
  onChange: HandleTime;
};

function TimeRangeInput({ start, end, onChange }: Props) {
  return (
    <div className={$['time-range-input']}>
      <div className={$['start-input']}>
        <input
          type="date"
          className={$['input']}
          value={start.date}
          onChange={onChange('start', 'date')}
        />
        <input
          type="time"
          className={$['input']}
          value={start.time}
          onChange={onChange('start', 'time')}
        />
      </div>
      <text className={$['range']}>~</text>
      <div className={$['end-input']}>
        <input
          type="date"
          className={$['input']}
          value={end.date}
          onChange={onChange('end', 'date')}
        />
        <input
          type="time"
          className={$['input']}
          value={end.time}
          onChange={onChange('end', 'time')}
        />
      </div>
    </div>
  );
}

export default TimeRangeInput;
