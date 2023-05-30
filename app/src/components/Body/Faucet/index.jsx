import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './styles.module.scss';
import { Icon } from '@iconify/react';
import ReactLoading from 'react-loading';
import { faucet, getFaucet } from '@api/faucet.api';
import { NETWORK } from '@src/constants';
import { timeAgo } from '@src/utils/timeAgo';
import toast from '@src/utils/toast';

export default function Faucet({ handleAccountsChanged }) {
  const account = useSelector((state) => state.account);

  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [transaction, setTransaction] = useState([]);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const { data } = await faucet({ network: NETWORK.MUMBAI, account });
      setTransaction([data, ...transaction]);
      console.log('click');
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.statusText || 'An error has been occur');
      setIsLoading(false);
    }
  };

  const handleConnectMetamask = () => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });
  };

  const onChange = (value) => {
    setDisabled(false);
  };

  const fetchFaucets = async () => {
    try {
      setIsLoading(true);
      const { data } = await getFaucet(account);
      setTransaction(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('fetch Faucet', error);
    }
  }

  useEffect(() => {
    if(account) {
      fetchFaucets();
    }
  }, [account]);

  return (
    <div className={styles.container}>
      {isLoading && (
        <div className={styles.loading}>
          <ReactLoading type="spinningBubbles" color="#ffffff" height={60} width={60} />
        </div>
      )}
      <div className={styles['faucet-container']}>
        <div className={styles['input-control']}>
          <input value={account} placeholder="Enter Your Wallet Address (0x...) or ETH Mainnet ENS Domain" readOnly />
          <button disabled={disabled || !account} onClick={handleClick}>
            Send me MATIC
          </button>
        </div>
        {!account && (
          <div className={styles['account-connect']}>
            <span onClick={handleConnectMetamask}>Connect metamask</span> to request MATIC. It&apos;s free!
          </div>
        )}
        <ReCAPTCHA sitekey="6LfM2UomAAAAAHMoERJhkJyyJAFzB9g0yOiOQDQ6" onChange={onChange} />
      </div>
      <div className={styles['transaction-container']}>
        <div className={styles['transaction-header']}>
          <div>Your transaction</div>
          <div>Time</div>
        </div>
        {transaction.length === 0 ? (
          <div className={styles['transaction-body']}>
            <div>-</div>
            <div></div>
          </div>
        ) : (
          transaction.map((item) => (
            <div className={styles['transaction-body']} key={item.txHash}>
              <div>
                <Icon icon="mingcute:link-line" color="black" />
                <a href={`https://mumbai.polygonscan.com/tx/${item.txHash}`} target="_blank" rel="noreferrer">
                  {item.txHash}
                </a>
              </div>
              <div>{timeAgo(new Date(item.createdAt).getTime())}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
