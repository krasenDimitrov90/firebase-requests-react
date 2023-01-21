import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth-context";

import './Navigation.style.css';

const Navigation = (props) => {

    const authCtx = React.useContext(AuthContext);

    const { isLoggedIn, loggout: loggoutHandler } = authCtx;

    const guestTemplate = (
        <>
            <li><Link to={'/login'} >Login</Link></li>
            <li><Link to={'/register'} >Register</Link></li>
        </>
    );

    const userTemplate = (
        <>
            <li><Link to={'/add-book'} >Add Book</Link></li>
            <li><Link to={'/'} onClick={loggoutHandler} >Loggout</Link></li>
        </>
    );

    return (
        <header>
            <nav className="navigation">
                <ul className="navigation-list">
                    <li><Link to={'/'} >Home</Link></li>
                    <li><Link to={'/books'} >Books</Link></li>
                    <li><Link to={'/inventory'} >Inventory</Link></li>
                    {isLoggedIn && userTemplate}
                    {!isLoggedIn && guestTemplate}
                </ul>
            </nav>
        </header>
    );
};

export default Navigation;