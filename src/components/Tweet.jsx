import { useState } from "react";
import { ethers } from "ethers";
import './../styles/tweet.scss';

const Tweet = ({ tweet, account }) => {
    const [value, setValue] = useState(0);

    const tip = async (address, amount) => {
        try {
            const { ethereum } = window

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();

                const gasPrice = await provider.getGasPrice();

                const transaction = {
                    from: account,
                    to: address,
                    value: ethers.utils.parseEther(amount),
                    nonce: provider.getTransactionCount(account, "latest"),
                    gasLimit: ethers.utils.hexlify(100000),
                    gasPrice: gasPrice,
                };

                await signer.sendTransaction(transaction).then((txn) => {
                    console.dir(txn);
                    alert(`You've sent ${amount} to ${address}`);
                });
            } else {
                console.log("ethereum object doesn't exist!");
            }
        } catch (error) {   
            console.log(error);
        }
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = async (event, address) => {
        try {
            event.preventDefault();
            await tip(address, value);
            setValue(0);
        } catch (error) {
            console.log('An unexpected error occurred:', error);
        }
    }

    return (
        <div className="tweet">
            <h3>Tweet address: {tweet.address}</h3>
            <p>"{tweet.message}"</p>
            <p>Posted on {tweet.dateTime}</p>
            <div className="">
            <form onSubmit={(event) => handleSubmit(event, tweet.address)} className="">
                <input 
                    type="number" 
                    value={value} 
                    placeholder="Enter an amount in ETH" 
                    onChange={handleChange} 
                    className=""/>
                <input 
                    type="submit" 
                    value="Tip" 
                    className=""/>
            </form>
        </div>
        </div>
    )
}

export default Tweet;