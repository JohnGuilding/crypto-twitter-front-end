import { useState } from "react";

import MintNFTButton from "../components/MintNFTButton";
import PostTweet from "../components/PostTweet";
import TweetFeed from '../components/TweetFeed';
import ToastMessage from '../components/ToastMessage.jsx';
import './../styles/dashboard.scss';

const Dashboard = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [list, setList] = useState([]);
    let toastProperties = null;

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
            showToast('error')
        }
    }

    const showToast = (type) => {
        switch (type) {
            case 'success':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Success',
                    description: '',
                    backgroundColor: '#5cb85c'
                };  
                break;
            case 'error':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Error',
                    description: 'An unexpected error has occured',
                    backgroundColor: '#d9534f'
                };  
                break;
            case 'info':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Info',
                    description: 'This is a info toast component',
                    backgroundColor: '#5bc0de'
                };  
                break;
            case 'warning':
                toastProperties = {
                    id: list.length + 1,
                    title: 'Warning',
                    description: 'This is a warning toast component',
                    backgroundColor: '#f0ed4e'
                };  
                break;
            default:
                toastProperties = [];
        }
        
        setList([...list, toastProperties]);
    }

    return (
        <main className="dashboard">
            <p className='header__unlock-text'>
                App Unlocked <span aria-label="unlocked" role="img">🗝</span>
            </p>
            <MintNFTButton />
            {!currentAccount && (
                <button onClick={connectWallet}>Connect Wallet to view and post content!</button>
                )}
            {currentAccount && (
                <>
                    <PostTweet showToast={showToast} />
                    <TweetFeed account={currentAccount} showToast={showToast}/>
                </>
            )}

            <ToastMessage toastList={list} position='button-right' setList={setList}/>
        </main>
    )
}

export default Dashboard;