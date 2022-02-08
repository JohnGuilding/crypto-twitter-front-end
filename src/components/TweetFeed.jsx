import { ethers } from "ethers";
import { useMemo, useState } from "react";
import Tweet from "./Tweet";
import './../styles/tweet-feed.scss';
import abi from './../utils/Cryptwit.json';

const TweetFeed = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [allTweets, setAllTweets] = useState([]);
    const contractAddress = '0x72699E6B9ce89a69EC6C0cdC005C41b97e5Bac3D';
    const contractABI = abi.abi;

    const getTweets = async () => {
        const { ethereum } = window;

        try {
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const cryptwitContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer);

                const tweets = await cryptwitContract.getTweets();

                const tweetObjects = [];
                tweets.forEach(tweet => {
                    tweetObjects.push({
                        address: tweet.tweeter,
                        timestamp: new Date(tweet.timestamp * 1000).toString(),
                        message: tweet.message
                    });
                });

                setAllTweets(tweetObjects);
            } else {
                console.log("ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("Make sure you have metamask");
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                await getTweets();
                console.log("Found an authorized account", account);
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert("Get MetaMask!")
                return;
            } 

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useMemo(() => {
        checkIfWalletIsConnected();
    }, [])

    const test = () => {
        console.log("Test allTweets",allTweets);
    }

    return (
        <div>
            <button onClick={test}>Test</button>
            {!currentAccount && (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
            {allTweets.length >= 1 && (
                <section className="tweet-feed">
                {allTweets.slice(0).reverse().map((tweet, index) => {
                    return (
                        <div key={index}>
                            <Tweet tweet={tweet}/>
                        </div>
                    )
                })}
            </section>
            )}
        </div>
    )
}

export default TweetFeed;