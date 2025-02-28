import { useLayoutEffect, useState } from 'react';

type CountdownConfig = {
  startNumber: number;
  diffNumber: number;
  waitingTime: number;
  endNumber: number;
};

export const useCountdown = (
  props: CountdownConfig,
): [number, React.Dispatch<React.SetStateAction<CountdownConfig>>] => {
  const [currentValue, setCurrentValue] = useState<number>(props.startNumber);
  const [config, setConfig] = useState<CountdownConfig>(props);

  useLayoutEffect(() => {
    const { startNumber, diffNumber = 1000, waitingTime = 1000, endNumber = 0 } = config;
    setCurrentValue(startNumber);

    const handler = setInterval(() => {
      setCurrentValue((val) => {
        const nextValue = val - diffNumber;
        if (nextValue <= endNumber) clearInterval(handler);
        return nextValue;
      });
    }, waitingTime);

    return () => clearInterval(handler);
  }, [config]);

  return [currentValue, setConfig];
};
