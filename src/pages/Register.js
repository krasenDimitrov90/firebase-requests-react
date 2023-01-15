import React from "react";
import { useNavigate } from "react-router";
import InputField from "../components/InputField";
import './Register.css';
import useInputCopy from "../hooks/use-input copy";
import * as api from '../services/api';
import { HandleError } from "../services/errors";

const registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const Register = () => {

    const navigate = useNavigate();

    const {
        value: email,
        valueIsValid: emailIsValid,
        hasError: emailInputHasError,
        onChangeHandler: emailInputOnChangeHandler,
        onBlurHandler: emailInputBlurHandler,
        resetValue: resetEmailInput,
    } = useInputCopy(value => value.match(emailValidator));

    const {
        value: password,
        valueIsValid: passwordIsValid,
        hasError: passwordInputHasError,
        onChangeHandler: passwordInputOnChangeHandler,
        onBlurHandler: passwordInputBlurHandler,
        resetValue: resetPasswordInput,
    } = useInputCopy(value => value.length > 5);

    const {
        value: repeatPassword,
        valueIsValid: repeatPasswordIsValid,
        hasError: repeatPasswordInputHasError,
        onChangeHandler: repeatPasswordInputOnChangeHandler,
        onBlurHandler: repeatPasswordInputBlurHandler,
        resetValue: resetRepeatPasswordInput,
    } = useInputCopy((value) => password === value);


    let formIsValid = true;

    if (!emailIsValid || !passwordIsValid || !repeatPasswordIsValid || password !== repeatPassword) {
        formIsValid = false;
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();


        if (password !== repeatPassword) {
            console.log('Passwords does\'t match!');
            return;
        }

        api.post(registerURL, {email, password})
            .then(data => navigate('/login'))
            .catch(err => {
                err.then(error => {
                    HandleError.loginError(error.error);
                });
            });

        resetEmailInput();
        resetPasswordInput();
        resetRepeatPasswordInput();
    };

    return (
        <>
            <h1>Register Page</h1>
            <form className="login-form" onSubmit={onSubmitHandler}>
                <InputField 
                    htmlFor='email'
                    label="Enter email"
                    type="text" 
                    id="email" 
                    name="email" 
                    value={email} 
                    onBlurHandler={emailInputBlurHandler} 
                    onChangeHandler={emailInputOnChangeHandler}
                />
                {emailInputHasError && <p>Incorrect email!</p>}

                <InputField 
                    htmlFor='password'
                    label="Enter password"
                    type="password" 
                    id="password" 
                    name="password" 
                    value={password} 
                    onBlurHandler={passwordInputBlurHandler} 
                    onChangeHandler={passwordInputOnChangeHandler}
                />
                {passwordInputHasError && <p>Password must have at least 6 characters!</p>}

                <InputField 
                    htmlFor='repeat-password'
                    label="Enter password"
                    type="password" 
                    id="repeat-password" 
                    name="repeat-password" 
                    value={repeatPassword} 
                    onBlurHandler={repeatPasswordInputBlurHandler} 
                    onChangeHandler={repeatPasswordInputOnChangeHandler}
                />
                {repeatPasswordInputHasError && <p>Passwords does't match!</p>}

                <button disabled={!formIsValid} type="submit">Register</button>
            </form>
        </>
    );
};

export default Register;