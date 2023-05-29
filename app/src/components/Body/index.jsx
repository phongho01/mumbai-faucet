import React from 'react';
import styles from './styles.module.scss';
import Title from './Title';
import Faucet from './Faucet';

export default function Body({ handleAccountsChanged }) {
  return (
    <div className={styles.container}>
      <Title />
      <Faucet handleAccountsChanged={handleAccountsChanged} />
    </div>
  );
}
