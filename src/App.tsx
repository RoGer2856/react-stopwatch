import { ReactElement, useState } from 'react';
import Stopwatch from './Stopwatch';
import styles from './App.module.css';
import Layout from './Layout';
import Laps from './Laps';

export default function App(): ReactElement {
  const [lapsInMillis, setLapsInMillis] = useState<number[]>([]);

  function onLapAdded(lapInMillis: number) {
    setLapsInMillis((prev: number[]) => {
      return [...prev, lapInMillis];
    });
  }

  function onResetLaps() {
    setLapsInMillis([]);
  }

  return (
    <>
      <Layout>
        <div className={styles.cards__container}>
          <div className={styles.card}>
            <Stopwatch onLapAdded={onLapAdded} onResetLaps={onResetLaps} />
          </div>
          <div className={styles.card}>
            <Laps lapsInMillis={lapsInMillis} />
          </div>
        </div>
      </Layout>
    </>
  );
}
