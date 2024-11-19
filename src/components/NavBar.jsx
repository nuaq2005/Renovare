import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                <Link to="/" className='link'> 
                <img src="/images/logo.jpeg" alt="Renovare Logo" className='logo'/>
                </Link>
                <span>Renovare</span>
            </div>
            <ul className='navbar-links'>
                <li><Link to="/" className='link'> Home </Link></li>
                <li><Link to="/create-post" className='link'> Create A Post </Link></li>
            </ul>
        </div>
    );
};

export default NavBar;