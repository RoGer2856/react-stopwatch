import React, { ReactElement, useEffect, useState } from 'react';
import { padWithZeroes } from './utils';

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
      {
        isRunning
          ? <button onClick={onPause} disabled={!isRunning}>Pause</button>
          : <button onClick={onStart} disabled={isRunning}>Start</button>
      }
      <button onClick={onReset} disabled={isRunning || timeMillis === 0}>Reset</button>
    </>
  );
}
