import Tweet from "./Tweet";
import './../styles/tweet-feed.scss';

const TweetFeed = () => {
    return (
        <section className="tweet-feed">
            <Tweet />
            <Tweet />
            <Tweet />
        </section>
    )
}

export default TweetFeed;