import clsx from 'clsx';
import cls from './style.module.css';
import { useEffect, useState } from 'react';
import { useNow } from '../../utils/hooks/useTimer';

interface ITimer {
  taskId?: number;
  minutes: number;
  seconds: number;
}

export const Timer = ({ minutes, seconds }: ITimer) => {
  const [isPlay, setPlay] = useState<boolean>(true);
  const [time, setTime] = useState<number | undefined>();
  const [initialTimer, setInitialTimer] = useState<number>(0);
  const [isCompleted, setCompleted] = useState<boolean>(false);

  const now = useNow(1000, time);

  const totalTime = minutes * 60 * 1000 + seconds * 1000;

  const elapsedTime = now - (time ?? now) + initialTimer;

  const remainingTime = Math.max(0, totalTime - elapsedTime);

  const remainingMinutes = isCompleted ? 0 : Math.floor(remainingTime / 60000);
  const remainingSeconds = isCompleted ? 0 : Math.floor((remainingTime % 60000) / 1000);

  useEffect(() => {
    if (remainingTime === 0 && !isCompleted) {
      setPlay(false);
      setTime(undefined);
      setCompleted(true);
    }
  }, [remainingTime, isCompleted]);

  const handlerPlay = () => {
    setTime(Date.now());
    setPlay(false);
    setCompleted(false); // Сбрасываем статус завершения, если запускаем снова
  };

  const handlerPause = () => {
    setInitialTimer(elapsedTime); // Фиксируем текущее время
    setTime(undefined);
    setPlay(true);
  };

  return (
    <div className={cls.buttonWrapper}>
      <button
        disabled={!isPlay || isCompleted}
        onClick={handlerPlay}
        className={clsx(cls.button, cls.icon, cls.iconPlay)}
        type="button"
      ></button>
      <button
        disabled={isCompleted}
        onClick={handlerPause}
        className={clsx(cls.button, cls.icon, cls.iconPause)}
        type="button"
      ></button>
      <span className={cls.created}>{`${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`}</span>
    </div>
  );
};
