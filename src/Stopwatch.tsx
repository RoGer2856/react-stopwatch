import { ReactElement, useEffect, useState } from 'react';
import { padWithZeroes } from './utils';
import styles from './Stopwatch.module.css';

const TIME_STEP_MILLIS = 100;

export default function Stopwatch(): ReactElement {
  const [timeMillis, setTimeMillis] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId = setInterval(() => {
      if (isRunning) {
        setTimeMillis((prev: number) => {
          return prev + TIME_STEP_MILLIS;
        });
      }
    }, TIME_STEP_MILLIS)

    return () => clearInterval(intervalId);
  }, [isRunning]);

  function onStart() {
    setIsRunning(true);
  }

  function onPause() {
    setIsRunning(false);
  }

  function onReset() {
    setTimeMillis(0);
  }

  const seconds = Math.floor(timeMillis / 1000);
  const minutes = Math.floor(seconds / 60);
  const millisInTheSecond = padWithZeroes(timeMillis - seconds * 1000, 3);
  const secondsInTheMinute = padWithZeroes(seconds - minutes * 60, 2);

  return (
    <>
      <div>{`${minutes}:${secondsInTheMinute}:${millisInTheSecond}`}</div>
      <div>
        {
          isRunning
            ? <button className={`${styles.button} ${styles.button__pause}`} onClick={onPause} disabled={!isRunning}>Pause</button>
            : <button className={`${styles.button} ${styles.button__start}`} onClick={onStart} disabled={isRunning}>Start</button>
        }
        <button className={`${styles.button} ${styles.button__reset}`} onClick={onReset} disabled={isRunning || timeMillis === 0}>Reset</button>
      </div>
    </>
  );
}
