import { ReactElement, useEffect, useState } from 'react';
import { computeTimeComponents } from './TimeComponents';
import styles from './Stopwatch.module.css';

const TIME_STEP_MILLIS = 10;

export default function Stopwatch(props: {
  onLapAdded: (lapInMillis: number) => void;
  onResetLaps: () => void;
}): ReactElement {
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
  }, [isRunning, setTimeMillis]);

  function onStart() {
    setIsRunning(true);
  }

  function onPause() {
    setIsRunning(false);
  }

  function onReset() {
    setIsRunning(false);
    setTimeMillis(0);
    props.onResetLaps();
  }

  function onLap() {
    props.onLapAdded(timeMillis);
  }

  const timeComponents = computeTimeComponents(timeMillis);

  return (
    <>
      <div aria-label="time elapsed">{timeComponents.toString()}</div>
      <div>
        {
          isRunning
            ? <button
                className={`${styles.button} ${styles.button__pause}`}
                onClick={onPause}
                disabled={!isRunning}
                aria-label="pause stopwatch"
              >
                Pause
              </button>
            : <button
                className={`${styles.button} ${styles.button__start}`}
                onClick={onStart}
                disabled={isRunning}
                aria-label="start stopwatch"
              >
                Start
              </button>
        }
        <button
          className={`${styles.button} ${styles.button__reset}`}
          onClick={onReset}
          disabled={timeMillis === 0}
          aria-label="reset stopwatch"
        >
          Reset
        </button>
        <button
          className={`${styles.button} ${styles.button__lap}`}
          onClick={onLap}
          disabled={timeMillis === 0 || !isRunning}
          aria-label="memorize lap"
        >
          Lap
        </button>
      </div>
    </>
  );
}
