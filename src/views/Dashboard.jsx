import MintNFTButton from "../components/MintNFTButton";
import TweetFeed from '../components/TweetFeed';
import './../styles/dashboard.scss';

const Dashboard = () => {
    return (
        <main className="dashboard">
            <MintNFTButton />
            <TweetFeed />
        </main>
    )
}

export default Dashboard;