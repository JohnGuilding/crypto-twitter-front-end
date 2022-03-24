import { useState } from "react";
import { ethers } from "ethers";

import MintNFTButton from "../components/MintNFTButton";
import PostTweet from "../components/PostTweet";
import TweetFeed from '../components/TweetFeed';
import ToastMessage from '../components/ToastMessage.jsx';
import './../styles/dashboard.scss';

const Dashboard = () => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [list, setList] = useState([]);
    const [value, setValue] = useState(0);
    // Using this 3 times, put it in .env
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

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

    const sendMoneyToLotteryPool = async (address, amount) => {
        try {
            const { ethereum } = window

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                const gasPrice = await provider.getGasPrice();

                const transaction = {
                    from: currentAccount,
                    to: address,
                    value: ethers.utils.parseEther(amount),
                    nonce: provider.getTransactionCount(currentAccount, "latest"),
                    gasLimit: ethers.utils.hexlify(100000),
                    gasPrice: gasPrice,
                };

                await signer.sendTransaction(transaction).then((txn) => {
                    console.dir(txn);
                    alert(`You've sent ${amount} to ${address}`);
                    showToast('success');
                });
            } else {
                console.log("ethereum object doesn't exist!");
                showToast('error');
            }
        } catch (error) {   
            console.log(error);
            showToast('error');
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = async (event, address) => {
        try {
            event.preventDefault();
            await sendMoneyToLotteryPool(address, value);
            setValue(0);
        } catch (error) {
            console.log('An unexpected error occurred:', error);
            showToast('error');
        }
    }

    return (
        <main className="dashboard">
            <p className='header__unlock-text'>
                App Unlocked <span aria-label="unlocked" role="img">🗝</span>
            </p>
            <div className="dashboard__secondary-menu">
                <MintNFTButton />
                <form onSubmit={(event) => handleSubmit(event, contractAddress)} className="dashboard__lottery-form">
                    <input
                        type="number"
                        value={value}
                        placeholder="Enter an amount in ETH"
                        onChange={handleChange}
                        className='dashboard__input'/>
                    <input
                        type="submit"
                        value="Send money to lottery pool"
                        className="dashboard__submit-button"/>
                    <p>Everytime you tweet, you're entered into a draw to win the lottery prize</p>
                </form>
            </div>
            {!currentAccount && (
                <button className='dashboard__connect-wallet-button' onClick={connectWallet}>Connect Wallet to view and post content!</button>
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