import { ReactElement, useEffect, useState } from 'react';
import { computeTimeComponents } from './utils';
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

  const timeComponents = computeTimeComponents(timeMillis);
  const seconds = String(timeComponents.secondsInTheMinute).padStart(2, '0');
  const millis = String(timeComponents.millisInTheSecond).padStart(3, '0');

  return (
    <>
      <div>{`${timeComponents.minutes}:${seconds}:${millis}`}</div>
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
