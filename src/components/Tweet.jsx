import './../styles/tweet.scss';

const Tweet = ({tweet}) => {
    return (
        <div className="tweet">
            <h3>{tweet.address}</h3>
            <h3>{tweet.timestamp}</h3>
            <h3>{tweet.message}</h3>
        </div>
    )
}

export default Tweet;