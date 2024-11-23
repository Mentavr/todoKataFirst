import { useLayoutEffect, useRef, useState } from 'react';

// interface IUseTimer {
//     updateInterval: number;
//     enable: any;
//     cb?: (e: unknown) => void;
// }

export const useNow = (updateInterval: number, enable: any, cb?: any) => {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  const [now, setNow] = useState(Date.now());

  useLayoutEffect(() => {
    if (!enable) {
      return;
    }

    setNow(Date.now());

    cbRef.current?.(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
      cbRef.current?.(Date.now());
    }, updateInterval);

    return () => {
      clearInterval(interval);
    };
  }, [updateInterval, enable]);

  return now;
};
