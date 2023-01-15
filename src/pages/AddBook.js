import React from "react";
import { useNavigate } from "react-router";
import InputField from "../components/InputField";
import AuthContext from "../context/auth-context";
import useInputCopy from "../hooks/use-input copy";

import * as api from '../services/api';
import { HandleError } from "../services/errors";

const AddBook = () => {

    const navigate = useNavigate();

    const authCtx = React.useContext(AuthContext);
    const userCredentials = authCtx.getUserCredentials();

    const {
        value: author,
        valueIsValid: authorIsValid,
        hasError: authorInputHasError,
        onChangeHandler: authorInputOnChangeHandler,
        onBlurHandler: authorInputBlurHandler,
        resetValue: resetAuthorInput,
    } = useInputCopy(value => value.trim().length > 0);

    const {
        value: title,
        valueIsValid: titleIsValid,
        hasError: titleInputHasError,
        onChangeHandler: titleInputOnChangeHandler,
        onBlurHandler: titleInputBlurHandler,
        resetValue: resetTitleInput,
    } = useInputCopy(value => value.trim().length > 0);

    const {
        value: description,
        valueIsValid: descriptionIsValid,
        hasError: descriptionInputHasError,
        onChangeHandler: descriptionInputOnChangeHandler,
        onBlurHandler: descriptionInputBlurHandler,
        resetValue: resetDescriptionInput,
    } = useInputCopy(value => value.trim().length > 0);

    const {
        value: image,
        valueIsValid: imageIsValid,
        hasError: imageInputHasError,
        onChangeHandler: imageInputOnChangeHandler,
        onBlurHandler: imageInputBlurHandler,
        resetValue: resetImageInput,
    } = useInputCopy(value => value.trim().length > 0);

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(userCredentials);

        let data = {author, title, description, image,
            email: userCredentials.userEmail,
            ownerId: userCredentials.userId,
        }

        api.post('https://testing-12da0-default-rtdb.europe-west1.firebasedatabase.app/books.json', data, userCredentials.userToken)
            .then(data => console.log(data))
            .catch(err => {
                err.then(error => {
                    alert(error.error);
                    authCtx.loggout();
                    navigate('/login');
                });
            });
    };

    return (
        <form onSubmit={submitHandler}>
            <InputField
                htmlFor='author'
                label="Enter author"
                type="text"
                id="author"
                name="author"
                value={author}
                onChangeHandler={authorInputOnChangeHandler}
                onBlurHandler={authorInputBlurHandler}
            />
            {authorInputHasError && <p>Must write an author!</p>}

            <InputField
                htmlFor='title'
                label="Enter title"
                type="text"
                id="title"
                name="title"
                value={title}
                onChangeHandler={titleInputOnChangeHandler}
                onBlurHandler={titleInputBlurHandler}
            />
            {titleInputHasError && <p>Must write an title!</p>}


            <InputField
                htmlFor='description'
                label="Enter description"
                type="text"
                id="description"
                name="description"
                value={description}
                onChangeHandler={descriptionInputOnChangeHandler}
                onBlurHandler={descriptionInputBlurHandler}
            />
            {descriptionInputHasError && <p>Must write an title!</p>}

            <InputField
                htmlFor='book-image'
                label="Enter image url"
                type="text"
                id="book-image"
                name="image"
                value={image}
                onChangeHandler={imageInputOnChangeHandler}
                onBlurHandler={imageInputBlurHandler}
            />
            {imageInputHasError && <p>Must paste an image url!</p>}

            <button>Send</button>
        </form>
    );
};

export default AddBook;