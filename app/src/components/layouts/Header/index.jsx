import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import jazzicon from '@metamask/jazzicon';

export default function Header({ handleAccountsChanged }) {
  const account = useSelector((state) => state.account);

  const avatarRef = useRef();

  const handleConnectMetamask = () => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const element = avatarRef.current;
    if (element && account) {
      const addr = account.slice(2, 10);
      const seed = parseInt(addr, 16);
      const icon = jazzicon(32, seed);
      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(icon);
    }
  }, [account, avatarRef]);

  return <div className={styles.header}>{account ? (<div>
    <div ref={avatarRef}></div>
    <span>{`${account.slice(0, 5)} ... ${account.slice(-4)}`}</span>
  </div>) : <button onClick={handleConnectMetamask}>Connect Metamask</button>}</div>;
}
