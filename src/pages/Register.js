import React from "react";
import './Register.css';

const Register = () => {
    return (
        <>
        <h1>Register Page</h1>
        <form className="login-form">
            <label htmlFor="email">Enter email</label>
            <input type="text" id="email" name="email" />
            <label htmlFor="password">Enter password</label>
            <input type="password" id="password" name="password" />
            <label htmlFor="repeat-password">Repeat password</label>
            <input type="password" id="repeat-password" name="repeat-password" />
        </form> 
        </>
    );
};

export default Register;