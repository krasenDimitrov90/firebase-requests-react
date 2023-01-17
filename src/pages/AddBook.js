import React from "react";
import { useNavigate } from "react-router";
import InputField from "../components/InputField";
import AuthContext from "../context/auth-context";
import useHttp from "../hooks/use-http";
import useInputCopy from "../hooks/use-input copy";


const AddBook = () => {

    const navigate = useNavigate();

    const { isLoading, sendRequest: requestAddBook } = useHttp();

    const authCtx = React.useContext(AuthContext);
    const userCredentials = authCtx.getUserCredentials();

    const {
        value: author,
        hasError: authorInputHasError,
        onChangeHandler: authorInputOnChangeHandler,
        onBlurHandler: authorInputBlurHandler,
        resetValue: resetAuthorInput,
    } = useInputCopy(value => value.trim().length > 0);

    const {
        value: title,
        hasError: titleInputHasError,
        onChangeHandler: titleInputOnChangeHandler,
        onBlurHandler: titleInputBlurHandler,
        resetValue: resetTitleInput,
    } = useInputCopy(value => value.trim().length > 0);

    const {
        value: description,
        hasError: descriptionInputHasError,
        onChangeHandler: descriptionInputOnChangeHandler,
        onBlurHandler: descriptionInputBlurHandler,
        resetValue: resetDescriptionInput,
    } = useInputCopy(value => value.trim().length > 0);

    const {
        value: image,
        hasError: imageInputHasError,
        onChangeHandler: imageInputOnChangeHandler,
        onBlurHandler: imageInputBlurHandler,
        resetValue: resetImageInput,
    } = useInputCopy(value => value.trim().length > 0);

    const addBookHandler = (data) => {
        console.log(data);
    };

    const errorHandler = (err) => {
        alert(err);
        authCtx.loggout();
        navigate('/login');
    };

    const submitHandler = (e) => {
        e.preventDefault();


        let data = {
            author, title, description, image,
            email: userCredentials.userEmail,
            ownerId: userCredentials.userId,
        }

        const requestConfig = {
            action: 'addBook',
            data: data,
            token: userCredentials.userToken
        };

        requestAddBook(requestConfig, addBookHandler, errorHandler);
    };

    return (
        <form onSubmit={submitHandler}>
            {isLoading && <h1>Loading...</h1>}
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