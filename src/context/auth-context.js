import React from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    loggout: () => { },
});

export const AuthContextProvider = (props) => {

    const token = localStorage.getItem('token');

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } 
    }, []);


    const loginHandler = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        setIsLoggedIn(true);
    };

    const loggoutHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
    };

    const contextValue = {
        token: token,
        isLoggedIn,
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