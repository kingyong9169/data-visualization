import { createContext, useContext, useState } from 'react';
import { POLLING_DURATION } from 'src/constants/polling';

const TimeControlValueContext = createContext({
  pollingTime: POLLING_DURATION,
});

const TimeControlActionContext = createContext({
  setPollingTime: {} as React.Dispatch<React.SetStateAction<number>>,
});

type Props = {
  children: React.ReactNode;
};

export function TimeControlProvider({ children }: Props) {
  const [pollingTime, setPollingTime] = useState<number>(POLLING_DURATION);

  return (
    <TimeControlValueContext.Provider value={{ pollingTime }}>
      <TimeControlActionContext.Provider value={{ setPollingTime }}>
        {children}
      </TimeControlActionContext.Provider>
    </TimeControlValueContext.Provider>
  );
}

export function useTimeControlAction() {
  const context = useContext(TimeControlActionContext);
  if (context === undefined) {
    throw new Error(
      'useTimeControlAction must be used within a TimeControlActionContext',
    );
  }
  return context;
}

export function useTimeControlValue() {
  const context = useContext(TimeControlValueContext);
  if (context === undefined) {
    throw new Error(
      'useTimeControlValue must be used within a TimeControlValueContext',
    );
  }
  return context;
}
