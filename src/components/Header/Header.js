import React from 'react';
import logo from './logo.png'
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <header className='header'>
            <nav className='navbar'>
                <NavLink to={'/gallery'} className='navItems'>Gallery</NavLink>
                <NavLink to={'/videos'} className='navItems'>Video</NavLink>
                <NavLink to={'/music'} className='navItems'>Music</NavLink>
            </nav>
            <img className='logo' src={logo} alt="logo.png"/>
        </header>
    );
}

export default Header;