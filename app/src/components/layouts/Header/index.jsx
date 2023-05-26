import styles from './styles.module.scss';
import { useSelector } from 'react-redux';

export default function Header({ handleAccountsChanged }) {
  const account = useSelector((state) => state.account);

  const handleConnectMetamask = () => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });
  };

  return <div className={styles.header}>{account ? <span>Hello friend</span> : <button onClick={handleConnectMetamask}>Connect Metamask</button>}</div>;
}
