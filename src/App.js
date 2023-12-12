import React, { useEffect, useState } from "react";
import './styles/App.css';
import './styles/Slider.css';
import twitterLogo from './assets/twitter-logo.svg';
import smurfCat from './utils/smurfCat.json'
import { ethers } from "ethers";

// Constants
const TWITTER_HANDLE = 'smurfcateth';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
// const OPENSEA_LINK = 'https://testnets.opensea.io/assets/';
// const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0x2B778f7CEa3f920242Ab6a42B828EE633b70E96D";
// const MINT_AMOUNT = "1";

const App = () => {

  /*
  * Just a state variable we use to store our user's public wallet. Don't forget to import useState.
  */
  const [currentAccount, setCurrentAccount] = useState("");
  
  /*
  * Gotta make sure this is async.
  */
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
    } else {
        console.log("We have the ethereum object sir/maam", ethereum);
    }

    /*
    * Check if we're authorized to access the user's wallet
    */
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    /*
    * User can have multiple authorized accounts, we grab the first one if its there!
    */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account)

      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      setupEventListener()
    } else {
      console.log("No authorized account found")
    }
  }

  /*
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      * Fancy method to request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      
      /*
      *  This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 

      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener() 
    } catch (error) {
      console.log(error)
    }
  }

  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, smurfCat.abi, signer);

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on("newFrenMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }


  const askContractToMintNft = async () => {
    
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, smurfCat.abi, signer);
  
        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.mintFren(1, {gasPrice: ethers.utils.parseUnits('1', 'gwei'), gasLimit: 253578, value: ethers.utils.parseEther("0.010000")});
        let chainId = await ethereum.request({ method: 'eth_chainId' });
        console.log("Connected to chain " + chainId);

        // String, hex code of the chainId of the Rinkebey test network (Change to 0x1 for mainnet)
        const rinkebyChainId = "0x4"; 
        if (chainId !== rinkebyChainId) {
	        alert("You are not connected to the Rinkeby Test Network!");
        }

      
        console.log("Mining...please wait.")
        await nftTxn.wait();
        
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
  
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect Wallet
    </button>
  );

  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
    checkIfWalletIsConnected();
  })

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
            renderNotConnectedContainer()
          ) : (
            // <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
            //   Mint NFT
            // </button>
            <button className="cta-button connect-wallet-button">
            Delayed by 1 hour
          </button>
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