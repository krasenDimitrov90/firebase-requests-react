import * as api from "../api.js";
import { HandleError } from "../errors.js";
console.log('in login componnet');

const loginURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

let loggedInComponent = document.getElementById('logged');

const loginErrorEl = document.getElementById('login-error');


const loginHandler = (e) => {
    e.preventDefault();

    let formData = Object.fromEntries(new FormData(e.currentTarget));
    let { email, password } = formData;
    let data = {
        email,
        password,
        returnSecureToken: true,
    };

    api.post(loginURL, data)
        .then(res => {
            loggedInComponent.style.display = 'block';
            console.log(res)
        })
        .catch(err => {
            err.then(error => {
                HandleError.loginError(error.error, loginErrorEl);
            });
        });
};

export { loginHandler };
