import { ReactElement, useState } from 'react';
import Stopwatch from './Stopwatch';
import styles from './App.module.css';
import Layout from './Layout';
import Laps from './Laps';

export default function App(): ReactElement {
  const [lapsInMillis, setLapsInMillis] = useState<number[]>([]);

  function handleLapAdded(lapInMillis: number) {
    setLapsInMillis((prev: number[]) => {
      return [...prev, lapInMillis];
    });
  }

  function handleResetLaps() {
    setLapsInMillis([]);
  }

  function handleClearLaps() {
    setLapsInMillis([]);
  }

  return (
    <>
      <Layout>
        <div className={styles.cards__container}>
          <div className={styles.card}>
            <Stopwatch onLapAdded={handleLapAdded} onResetLaps={handleResetLaps} />
          </div>
          <div className={styles.card}>
            <Laps lapsInMillis={lapsInMillis} onClearLaps={handleClearLaps} />
          </div>
        </div>
      </Layout>
    </>
  );
}
