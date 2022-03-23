import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './../styles/header.scss';

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    const toggleNav = () => {
        setToggleMenu(!toggleMenu);
    }

    useEffect(() => {
        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])

    return (
        <header className='header'>
            <h1 className='header__title'>Cyptwit</h1>
            {(toggleMenu || screenWidth > 500) && (
            <ul className='header__list'>
                <li className='header__list-item'><Link to="/">Dashboard</Link></li>
                <li className='header__list-item'><Link to="/profile">Profile</Link></li>
            </ul>
            )}

            <FontAwesomeIcon icon={faBars} className='header__menu-icon' onClick={toggleNav}/>
        </header>
    )
}

export default Header;