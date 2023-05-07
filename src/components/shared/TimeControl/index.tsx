import { useState } from 'react';
import {
  useTimeControlAction,
  useTimeControlValue,
} from 'src/store/TimeControlProvider';

import $ from './style.module.scss';

export default function TimeControl() {
  const { setPollingTime } = useTimeControlAction();
  const { pollingTime } = useTimeControlValue();
  const [time, setTime] = useState(pollingTime);

  const handleTimer = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTime(+e.target.value * 1000);

  const handleConfirm = () => setPollingTime(time);

  return (
    <div className={$['timer-control']}>
      <div className={$['timer-input-box']}>
        <label htmlFor="timer">폴링 시간 조절(s)</label>
        <input
          type="number"
          id="timer"
          name="timer"
          value={time / 1000}
          onChange={handleTimer}
          className={$['timer-input']}
        />
      </div>
      <button type="button" onClick={handleConfirm} className={$['timer-btn']}>
        적용
      </button>
    </div>
  );
}
