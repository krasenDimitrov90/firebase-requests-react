import React from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    loggout: () => { },
});

export const AuthContextProvider = (props) => {

    const token = !!localStorage.getItem('token');

    const userIsLoggedIn = !!token;

    const loginHandler = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
    };

    const loggoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        loggout: loggoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue} >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;