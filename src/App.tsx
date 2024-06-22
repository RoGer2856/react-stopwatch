import { ReactElement } from 'react';
import Stopwatch from './Stopwatch';
import styles from './App.module.css';

export default function App(): ReactElement {
  return (
    <>
      <div className={styles.content__container}>
        <div className={styles.card}>
          <Stopwatch />
        </div>
      </div>
    </>
  );
}
