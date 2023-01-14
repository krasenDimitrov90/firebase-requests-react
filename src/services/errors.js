// const registerError = {
//     'INVALID_EMAIL': 'Invalid email address!',
//     'EMAIL_EXISTS': 'Email exists',
//     'WEAK_PASSWORD : Password should be at least 6 characters': 'Password must contain at least 6 characters',
// };

// const loginError = {
//     'INVALID_EMAIL': 'Invalid email!',
//     'EMAIL_NOT_FOUND': 'Email not found!',
//     'INVALID_PASSWORD': 'Wrong password!',
// };


export class HandleError {
    static registerError(error, component) {
        alert(error.message);
        // component.textContent = registerError[error.message];
        // component.style.display = 'block';
    }

    static loginError(error, component) {
        alert(error.message);
        // component.textContent = loginError[error.message];
        // component.style.display = 'block';
    }
}
