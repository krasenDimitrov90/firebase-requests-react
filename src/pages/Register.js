import React from "react";
import InputField from "../components/InputField";
import './Register.css';
import useInputCopy from "../hooks/use-input copy";

const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const Register = () => {

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

        const formData = Object.fromEntries(new FormData(e.target));

        if (password !== repeatPassword) {
            console.log('Passwords does\'t match!');
            return;
        }

        console.log(formData);
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