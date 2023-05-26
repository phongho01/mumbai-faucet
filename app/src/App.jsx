import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '@components/layouts/Header';
import Body from '@components/Body';
import { setAccount } from '@src/app/slice/account';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else {
      dispatch(setAccount(accounts[0]));
    }
  };

  // const requireSwitchNetwork = async () => {
  //   try {
  //     await window.ethereum.request({
  //       method: 'wallet_switchEthereumChain',
  //       params: [{ chainId: '0x61' }],
  //     });
  //   } catch (error) {
  //     if (error.code === 4902) {
  //       try {
  //         await window.ethereum.request({
  //           method: 'wallet_addEthereumChain',
  //           params: [
  //             {
  //               chainId: '0x61',
  //               rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  //             },
  //           ],
  //         });
  //       } catch (addError) {
  //         console.error(addError);
  //       }
  //     }
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
          console.error(err);
        });

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      // requireSwitchNetwork();
    } else {
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
  }, []);

  return (
    <div className="App">
      <Header handleAccountsChanged={handleAccountsChanged} />
      <Body />
    </div>
  );
}

export default App;
