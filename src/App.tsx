import { ReactElement } from 'react';
import Stopwatch from './Stopwatch';
import styles from './App.module.css';
import Layout from './Layout';

export default function App(): ReactElement {
  return (
    <>
      <Layout>
        <div className={styles.card}>
          <Stopwatch />
        </div>
      </Layout>
    </>
  );
}
