import React from "react";
import AuthContext from "../context/auth-context";
import useInput from "../hooks/use-input";
import { useNavigate } from "react-router-dom";
import './Login.css';
import useHttp from "../hooks/use-http";



const emailValidator = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const Login = () => {

    const navigate = useNavigate();

    const { isLoading, sendRequest: requestLogin } = useHttp();

    const authCtx = React.useContext(AuthContext);

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

    const loginHandler = (userData) => {
        authCtx.login(userData.idToken, userData.localId, userData.email);
        navigate('/');
    };

    const errorHandler = (err) => {
        alert(err);
    };

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

        const requestConfig = {
            action: 'login',
            data: data,
        };

        requestLogin(requestConfig, loginHandler, errorHandler);

        resetEmailInput();
        resetPasswordInput();
    };


    return (
        <>

            <section className="login-form-wrapper">
                <form onSubmit={submitHandler} className="login-form">
                    <h1 className="login-form-title" >LOG IN</h1>
                    {/* <label htmlFor="email">Enter email</label> */}
                    <div className="email-input">
                        <i class="fa-solid fa-user"></i>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={enteredEmail}
                            onBlur={emailInputOnBlurHandler}
                            onChange={emailInputChangeHandler}
                        />
                    </div>
                    {emailInputIsInvalid && <p className="invalid-email" >Invalid Email!</p>}
                    {/* <label htmlFor="password">Enter password</label> */}
                    <div className="password-input">
                        <i class="fa-solid fa-lock"></i>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={enteredPassword}
                            onChange={passwordInputChangeHandler}
                            onBlur={passwordInputOnBlurHandler}
                        />
                    </div>
                    {passwordInputIsInvalid && <p className="invalid-email" >Incorect password</p>}
                    <div className="login-btn-wrapper">
                        <button className="login-btn">Login</button>
                    </div>

                </form>
            </section>
        </>
    );
};

export default Login;