import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './styles/App.css';
import './styles/Slider.css';
import twitterLogo from './assets/twitter-logo.svg';
import smurfCat from './utils/smurfCat.json'

const CONTRACT_ADDRESS = '0xA312242202BFF16A3B87D32b14c6e06cB425BCe5';
const ABI = [smurfCat];
const TWITTER_HANDLE = 'smurfcateth';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [eligibility, setEligibility] = useState({ phases: [], allowedMints: [] });
  const [saleIsActive, setSaleIsActive] = useState(false);
  const [checkAddress, setCheckAddress] = useState('');

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('Ethereum object not found');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        const account = accounts[0];
        setCurrentAccount(account);
        checkEligibility(account);
        checkSaleState();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
      checkEligibility(accounts[0]);
      checkSaleState();
    } catch (error) {
      console.error(error);
    }
  };

  const checkEligibility = async (address) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const eligibilityData = await contract.checkMintEligibility(address);
        setEligibility({ phases: eligibilityData.phases, allowedMints: eligibilityData.allowedMints });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkSaleState = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const isActive = await contract.saleIsActive();
        setSaleIsActive(isActive);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mintNFT = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

        const txn = await contract.mint(/* Number of tokens and other parameters if required */);
        console.log('Minting...');
        await txn.wait();
        console.log('Minted:', txn.hash);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <div className="title-container">
            <section className="title2">Nate Hallinan</section>
            <section className="title3">x</section>
            <section className="title">Real Smurf Cat</section>
          </div>
          <div className="slideshow">
            <div className="slides">
                <section></section>
                <section></section>
                <section></section>
                <section></section>
                <section></section>
            </div>
          </div>
          <p className="sub-text">
            Nate Hallinan's genesis NFT collection. Free to qualifying шайлушай holders.
          </p>
          {currentAccount ? (
          <>
            <p>Connected Wallet: {currentAccount}</p>
            <input
              type="text"
              placeholder="Check another address"
              value={checkAddress}
              onChange={(e) => setCheckAddress(e.target.value)}
            />
            <button onClick={() => checkEligibility(checkAddress)}>Check Eligibility</button>
            <button
              onClick={mintNFT}
              disabled={!saleIsActive || eligibility.allowedMints.length === 0}
            >
              {saleIsActive ? 'Mint NFT' : 'Minting Not Live'}
            </button>
          </>
        ) : (
          <button onClick={connectWallet}>Connect Wallet</button>
        )}

        </div>
        <div className="timer">
          <iframe src="https://free.timeanddate.com/countdown/i953fa6z/n202/cf11/cm0/cu4/ct0/cs1/ca0/co0/cr0/ss0/cacfff/cpc000/pct/tcfff/fn3/fs300/szw320/szh135/iso2023-12-12T12:00:00" allowtransparency="true" frameBorder="0" title='countdown' width="912" height="55"></iframe>
        </div>
        <div className="links-container">
          <a className='links' href='https://natehallinan.com/resume'>About the artist</a>
          <a className='links' href='https://smurfcat.eth.limo'>Token website</a>
        </div>
        <div className="cont2">
          <p className="h-text">MINT SCHEDULE </p>
          <p className="p-text">(Wallet list and criteria for eligibility will be released on Monday, Dec 11 at 12PM PST) </p>
          <p className="h-text">Phase 1 (3000 mints)</p>
          <p className="p-text">Who: Top 2000 holders based on 3 snapshots</p>
          <p className="p-text">Top 1000: 2 free mints </p>
          <p className="p-text">Top 1001-2000: 1 free mint</p>
          <p className="p-text">When: Tuesday, Dec 12 at 12PM PST</p>
          <p className="p-text">Important: Mints will be guaranteed for at least 12 hours until Phase 2 starts </p>
          <p className="h-text">Phase 2 (Remainder of Phase 1 supply)</p>
          <p className="p-text">Who: In addition to the top 2000 wallets, the top 2001-2500 holders based on 3 snapshots will have a chance for 1 free mint until all 3000 mints are claimed</p>
          <p className="p-text">When: Wednesday, Dec 13 at 12AM PST</p>
          <p className="h-text">Phase 3 (300 mints @ 0.01 eth each) </p>
          <p className="p-text">Who: 330 Whitelisted addresses (10% oversubscribed due to high demand)</p>
          <p className="p-text">When: Wednesday, Dec 13 at 12PM PST</p>
          <p className="h-text">Reveal: 24 hours after collection is minted out</p>
          <p className="p-text">Happy holidays from Real Smurf Cat and Nate Hallinan!</p>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{` Twitter @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;