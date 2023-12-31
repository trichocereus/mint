import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './styles/App.css';
import './styles/Slider.css';
import twitterLogo from './assets/twitter-logo.svg';
import smurfABI from './abi/abi.js'



const CONTRACT_ADDRESS = '0x5c671133968c512eed2518835864e9f39453f1e0';
const ABI = smurfABI;
const TWITTER_HANDLE = 'smurfcateth';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
//const value = 0;

function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [eligibility, setEligibility] = useState({ phases: [], allowedMints: [] });
  const [saleIsActive, setSaleIsActive] = useState(true);
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
        console.log("Eligibility updated:", { phases: eligibilityData.phases, allowedMints: eligibilityData.allowedMints });
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
  
        const isAllowList4 = eligibility.allowedMints[2] > 0;
        const isPhase3Active = eligibility.phases[2] === 'Phase 3';
        const value = isAllowList4 && isPhase3Active ? ethers.utils.parseEther("0.01") : ethers.utils.parseEther("0");
  
        console.log("Eligibility:", eligibility);
        console.log("isAllowList4:", isAllowList4, "isPhase3Active:", isPhase3Active, "Value:", value.toString());
  
        const txn = await contract.mint(1, { value });
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
          <div className='mintcont'>
            <p className='minttit'>Connected: {currentAccount}</p>
            {/* <input
              type="text"
              placeholder="Check another address"
              value={checkAddress}
              onChange={(e) => setCheckAddress(e.target.value)}
              className='inpu'
            /> */}
            {/* <button className='inputi' onClick={() => checkEligibility(checkAddress)}>Check Eligibility</button> */}
            {/* Display eligibility information here */}
    <div>
      {/* <p className='minttxt'>Eligibility: {eligibility.phases.join(', ')}</p>
      <p className='minttxt'>Allowed: {eligibility.allowedMints.join(', ')}</p>
      <p className='minttxt'>(Above data is not completely up to date, please refer to spreadsheet below)</p> */}
    </div>
            {/* <button
              className='mintbtn'
              onClick={mintNFT}
              disabled={!saleIsActive || eligibility.allowedMints.length === 0}
            >
              {saleIsActive ? 'Mint NFT' : 'Minting Not Live'}
            </button> */}
            <a className='mintbtn' href='https://docs.google.com/spreadsheets/d/13xoUaHkTcEShY-vWQkpauLUUq5IWV46eeacgmDejc2Y/edit?ouid=105360096499324579031&usp=sheets_home&ths=true'>Check eligibility here</a>
          </div>
        ) : (
          <button className='connect' onClick={connectWallet}>Connect Wallet</button>
        )}

        </div>
        <div className="timer">
          <iframe src="https://free.timeanddate.com/countdown/i953fa6z/n202/cf11/cm0/cu4/ct0/cs1/ca0/co0/cr0/ss0/cacfff/cpc000/pct/tcfff/fn3/fs300/szw320/szh135/iso2023-12-13T12:00:00" allowtransparency="true" frameBorder="0" title='countdown' width="912" height="55"></iframe>
        </div>
        <div className="links-container">
          <a className='links' href='https://natehallinan.com/resume'>About the artist</a>
          <a className='links' href='https://smurfcat.eth.limo'>Token website</a>
        </div>
        <div className="cont2">
          <p className="t-text">UPDATED MINT SCHEDULE </p>
          <p className="h-text">Phase 1 (3300 mints)</p>
          <p className="p-text">Who: Top 2000 holders based on 3 snapshots</p>
          <p className="p-text">Top 1000: 2 free mints </p>
          <p className="p-text">Top 1001-2000: 1 free mint</p>
          <p className="p-text">*Mints will be guaranteed to holders for at least 12 hours until Phase 2 starts* </p>
          <p className="p-text">300 Whitelisted addresses can mint for 0.01 eth (10% oversubscribed due to high demand)</p>
          <p className="p-text">When: Wednesday, Dec 13 at 12PM PST</p>
          <p className="h-text">Phase 2 (remaining for 0.01 eth each) </p>
          <p className="p-text">Who: Public get a chance to mint remaining supply</p>
          <p className="p-text">When: Thursday, Dec 14 at 12AM PST</p>
          <p className="h-text">Reveal: 48 hours after collection is minted out</p>
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