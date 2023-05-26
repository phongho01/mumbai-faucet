import React from 'react';
import styles from './styles.module.scss';
import Title from './Title';
import Faucet from './Faucet';

export default function Body() {
  return (
    <div className={styles.container}>
      <Title />
      <Faucet />
    </div>
  );
}
