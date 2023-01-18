import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth-context";

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
            <nav>
                <li><Link to={'/'} >Home</Link></li>
                <li><Link to={'/books'} >Books</Link></li>
                {isLoggedIn && userTemplate}
                {!isLoggedIn && guestTemplate}
            </nav>
        </header>
    );
};

export default Navigation;