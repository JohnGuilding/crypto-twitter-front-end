import { Link } from 'react-router-dom';
import './../styles/header.scss';

const Header = () => {
    return (
        <header className='header'>
            <div>
                Unlocked!{" "}
                <span aria-label="unlocked" role="img">
                🗝
                </span>
            </div>
            <h1>Cyptwit</h1>
            <h2>
                <Link to="/">Dashboard</Link>
            </h2> 
            {" | "}
            <h2>
                <Link to="/profile">Profile</Link>
            </h2>
        </header>
    )
}

export default Header;