import React from 'react'
import styles from './styles.module.scss';

export default function Faucet() {
  return (
    <div className={styles.container}>
      <div className={styles['input-control']}>
        <input />
        <button>Send me MATIC</button>
      </div>
    </div>
  )
}
