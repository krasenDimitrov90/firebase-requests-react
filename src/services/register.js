import * as api from "../api.js";
import { HandleError } from "../errors.js";
console.log('in register');

const registerURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0dqaMV0xMmpNH3wM-nAhgVjeD5R0xjU8';

let registerComponent = document.getElementById('registered');

const registerErrorEl = document.getElementById('register-error');


const registerHandler = (e) => {
    e.preventDefault();

    let formData = Object.fromEntries(new FormData(e.currentTarget));
    let { email, password } = formData;
    let data = {
        email,
        password,
        returnSecureToken: true,
    };

    api.post(registerURL, data)
        .then(res => console.log(res))
        .catch(err => {
            err.then(error => {
                HandleError.registerError(error.error, registerErrorEl);
            });
        });
};

export { registerHandler };