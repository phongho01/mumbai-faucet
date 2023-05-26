import React from 'react'
import styles from './styles.module.scss';

export default function Title() {
  return (
    <div className={styles['title-container']}>
      <div className={styles.title}>MUMBAI FAUCET</div>
      <div className={styles['sub-title']}>Fast and reliable. 0.2 Mumbai MATIC/day.</div>
    </div>
  )
}
