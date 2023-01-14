import React from "react";
import AuthContext from "../context/auth-context";
import useInput from "../hooks/use-input";
import './Login.css';
import * as api from '../services/api';
import { HandleError } from "../services/errors";


const loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const Login = () => {

    const authCtx = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = React.useState(false);

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        inputHasError: emailInputIsInvalid,
        valueInputChangeHandler: emailInputChangeHandler,
        valueInputOnBlurHandler: emailInputOnBlurHandler,
        reset: resetEmailInput,
    } = useInput(value => value.match(emailValidator));

    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        inputHasError: passwordInputIsInvalid,
        valueInputChangeHandler: passwordInputChangeHandler,
        valueInputOnBlurHandler: passwordInputOnBlurHandler,
        reset: resetPasswordInput,
    } = useInput(value => value.trim().length >= 6);


    const submitHandler = (e) => {
        e.preventDefault();

        if (!enteredEmailIsValid) {
            return;
        }

        if (!enteredPasswordIsValid) {
            return;
        }


        const data = {
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
        };

        setIsLoading(true);
        api.post(loginURL, data)
            .then(user => {
                setIsLoading(false)
                authCtx.login(user.idToken, user.localId);
            })
            .catch(err => {
                setIsLoading(false)
                err.then(error => {
                    HandleError.loginError(error.error);
                });
            });
        resetEmailInput();
        resetPasswordInput();
    };


    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={submitHandler} className="login-form">
                <label htmlFor="email">Enter email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={enteredEmail}
                    onBlur={emailInputOnBlurHandler}
                    onChange={emailInputChangeHandler}
                />
                {emailInputIsInvalid && <p>Invalid Email!</p>}
                <label htmlFor="password">Enter password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={enteredPassword}
                    onChange={passwordInputChangeHandler}
                    onBlur={passwordInputOnBlurHandler}
                />
                {passwordInputIsInvalid && <p>Wrong password</p>}
                {isLoading && <p>Loading...</p>}
                {!isLoading && <button>Login</button>}

            </form>
        </>
    );
};

export default Login;