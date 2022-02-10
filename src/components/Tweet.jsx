import './../styles/tweet.scss';

const Tweet = ({tweet}) => {
    return (
        <div className="tweet">
            <h3>Tweet address: {tweet.address}</h3>
            <p>"{tweet.message}"</p>
            <p>Posted on {tweet.dateTime}</p>
        </div>
    )
}

export default Tweet;