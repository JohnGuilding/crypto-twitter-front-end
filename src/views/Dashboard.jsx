import { useState } from "react";

import MintNFTButton from "../components/MintNFTButton";
import PostTweet from "../components/PostTweet";
import TweetFeed from '../components/TweetFeed';
import './../styles/dashboard.scss';

const Dashboard = () => {
    const [currentAccount, setCurrentAccount] = useState("");

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

    return (
        <main className="dashboard">
            <MintNFTButton />
            {!currentAccount && (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
            <PostTweet />
            <TweetFeed account={currentAccount} />
        </main>
    )
}

export default Dashboard;