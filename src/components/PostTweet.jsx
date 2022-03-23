import { useState } from "react";
import { ethers } from "ethers";
import abi from './../utils/Cryptwit.json';
import './../styles/post-tweet.scss'

const PostTweet = ({ showToast }) => {
    const [value, setValue] = useState("");
    const contractAddress = '0x2A4c5DC46f064e6BD805B57DB429E94F0E85CA6e';
    const contractABI = abi.abi;

    const postTweet = async (message) => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const cryptwitContract = new ethers.Contract(
                    contractAddress,
                    contractABI,
                    signer
                );
        
                const tweetTxn = await cryptwitContract.tweet(message, { gasLimit: 300000 });
                console.log("You're posting a tweet:", message);

                await tweetTxn.wait();
                console.log("You've posted a tweet:", message);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        await postTweet(value);
        setValue("");
    }
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <input 
                    type="text" 
                    value={value} 
                    placeholder="What's occuring?" 
                    onChange={handleChange} 
                    className="form__input"/>
                <input 
                    type="submit" 
                    value="Tweet!" 
                    className="form__submit-button"/>
            </form>
        </div>
    )
}

export default PostTweet;