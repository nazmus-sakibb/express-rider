import React, { useContext } from 'react';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser, signedInUser, setSignedInUser] = useContext(UserContext);
    return (
        <div className="header-area d-flex justify-content-between align-items-center">
            <div>
                <h1>Express Rider</h1>
            </div>
            <nav className="nav-bar me-5">
                <ul className="d-flex flex-row m-0 p-0">
                    <li>Home</li>
                    <li>Destination</li>
                    <li>Blog</li>
                    <li>Contact</li>
                    <li style={{fontWeight: 'bold'}}> {loggedInUser.name || signedInUser.name}</li>
                </ul>
            </nav>
        </div>
    )
};

export default Header;