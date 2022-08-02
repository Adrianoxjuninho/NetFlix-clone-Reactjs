import React from "react";
import './Header.css';
import logo from '../images/logo.png';
import avatar from '../images/avatar.png';

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={logo}/>
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src={avatar}/>
                </a>
            </div>
        </header>
    );
}