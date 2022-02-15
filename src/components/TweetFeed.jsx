import Tweet from "./Tweet";
import { ethers } from "ethers";
import { useMemo, useState } from "react";
import './../styles/tweet-feed.scss';
import abi from './../utils/Cryptwit.json';

const TweetFeed = ({ account }) => {
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
                        dateTime: convertUnixToDate(tweet.timestamp),
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

    const convertUnixToDate = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${date.toLocaleDateString("en-GB")} at ${hours}:${minutes}`;
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

    useMemo(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <div className="tweet-feed">
            {allTweets.length >= 1 && (
                <section className="tweet-feed_tweets">
                {allTweets.slice(0).reverse().map((tweet, index) => {
                    return (
                        <div key={index}>
                            <Tweet tweet={tweet} account={account}/>
                        </div>
                    )
                })}
            </section>
            )}
        </div>
    )
}

export default TweetFeed;