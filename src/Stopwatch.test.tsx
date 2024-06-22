import { fireEvent, render, screen } from '@testing-library/react';
import Stopwatch from './Stopwatch';
import { act } from 'react';

function getElapsedTimeText() {
  return screen.getByLabelText('time elapsed').textContent;
}

function queryStartButton() {
  return screen.queryByLabelText('start stopwatch');
}

function queryPauseButton() {
  return screen.queryByLabelText('pause stopwatch');
}

function queryResetButton() {
  return screen.getByLabelText('reset stopwatch');
}

test('intial state; buttons and elapsed time render', () => {
  render(<Stopwatch onLapAdded={(lapInMillis) => { }} onResetLaps={() => { }} />);

  expect(getElapsedTimeText()).toBe('00:00:000');

  const startButton = queryStartButton();
  expect(startButton).toBeInTheDocument();
  expect(startButton).not.toBeDisabled();

  expect(queryPauseButton()).toBeNull();

  const resetButton = queryResetButton();
  expect(resetButton).toBeInTheDocument();
  expect(resetButton).toBeDisabled();
});

test('starting stopwatch; time increases', () => {
  jest.useFakeTimers();

  render(<Stopwatch onLapAdded={(lapInMillis) => { }} onResetLaps={() => { }} />);

  fireEvent.click(queryStartButton()!);

  act(() => {
    jest.advanceTimersByTime(1500);
  });

  expect(getElapsedTimeText()).toBe('00:01:500');

  act(() => {
    jest.advanceTimersByTime(1500);
  });

  expect(getElapsedTimeText()).toBe('00:03:000');
});

test('starting, then pausing stopwatch; time increases, then stops', () => {
  jest.useFakeTimers();

  render(<Stopwatch onLapAdded={(lapInMillis) => { }} onResetLaps={() => { }} />);

  fireEvent.click(queryStartButton()!);

  act(() => {
    jest.advanceTimersByTime(1500);
  });

  expect(getElapsedTimeText()).toBe('00:01:500');

  fireEvent.click(queryPauseButton()!);

  act(() => {
    jest.advanceTimersByTime(1500);
  });

  expect(getElapsedTimeText()).toBe('00:01:500');
});

test('starting, then resetting stopwatch; time increases, then timer is set to 0 and stops', () => {
  jest.useFakeTimers();

  render(<Stopwatch onLapAdded={(lapInMillis) => { }} onResetLaps={() => { }} />);

  fireEvent.click(queryStartButton()!);

  act(() => {
    jest.advanceTimersByTime(1500);
  });

  expect(getElapsedTimeText()).toBe('00:01:500');

  fireEvent.click(queryResetButton()!);

  expect(getElapsedTimeText()).toBe('00:00:000');

  act(() => {
    jest.advanceTimersByTime(1500);
  });

  expect(getElapsedTimeText()).toBe('00:00:000');
});

test('resetting the timer while it is running; time is reset to 0 and stops incrementing', () => {
  jest.useFakeTimers();

  render(<Stopwatch onLapAdded={(lapInMillis) => { }} onResetLaps={() => { }} />);

  fireEvent.click(queryStartButton()!);

  act(() => {
    jest.advanceTimersByTime(1500);
  });

  {
    expect(getElapsedTimeText()).toBe('00:01:500');

    const startButton = queryStartButton();
    expect(startButton).toBeNull();

    const pauseButton = queryPauseButton();
    expect(pauseButton).toBeInTheDocument();
    expect(pauseButton).not.toBeDisabled();

    const resetButton = queryResetButton();
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).not.toBeDisabled();
  }

  fireEvent.click(queryResetButton()!);

  {
    expect(getElapsedTimeText()).toBe('00:00:000');

    const startButton = queryStartButton();
    expect(startButton).toBeInTheDocument();
    expect(startButton).not.toBeDisabled();

    expect(queryPauseButton()).toBeNull();

    const resetButton = queryResetButton();
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toBeDisabled();
  }

  act(() => {
    jest.advanceTimersByTime(1500);
  });

  expect(getElapsedTimeText()).toBe('00:00:000');
});

test('start, pause, reset; checking button availabilities and their functions and time elapsing', () => {
  jest.useFakeTimers();

  render(<Stopwatch onLapAdded={(lapInMillis) => { }} onResetLaps={() => { }} />);

  fireEvent.click(queryStartButton()!);

  act(() => {
    jest.advanceTimersByTime(1500);
  });

  {
    expect(getElapsedTimeText()).toBe('00:01:500');

    const startButton = queryStartButton();
    expect(startButton).toBeNull();

    const pauseButton = queryPauseButton();
    expect(pauseButton).toBeInTheDocument();
    expect(pauseButton).not.toBeDisabled();

    const resetButton = queryResetButton();
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).not.toBeDisabled();
  }

  fireEvent.click(queryPauseButton()!);

  {
    expect(getElapsedTimeText()).toBe('00:01:500');

    const startButton = queryStartButton();
    expect(startButton).toBeInTheDocument();
    expect(startButton).not.toBeDisabled();

    const pauseButton = queryPauseButton();
    expect(pauseButton).toBeNull();

    const resetButton = queryResetButton();
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).not.toBeDisabled();
  }

  fireEvent.click(queryResetButton()!);

  {
    expect(getElapsedTimeText()).toBe('00:00:000');

    const startButton = queryStartButton();
    expect(startButton).toBeInTheDocument();
    expect(startButton).not.toBeDisabled();

    expect(queryPauseButton()).toBeNull();

    const resetButton = queryResetButton();
    expect(resetButton).toBeInTheDocument();
    expect(resetButton).toBeDisabled();
  }
});
