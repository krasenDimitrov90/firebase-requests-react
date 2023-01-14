import React from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = React.useState('');
    const [enteredValueIsTuoched, setEnteredValueIsTuoched] = React.useState(false);

    const valueIsValid = validateValue(enteredValue);
    const inputHasError = !valueIsValid && enteredValueIsTuoched;

    const valueInputChangeHandler = (e) => {
        setEnteredValue(e.target.value);
    };

    const valueInputOnBlurHandler = (e) => {
        setEnteredValueIsTuoched(true);
    };

    const reset = () => {
        setEnteredValue('');
        setEnteredValueIsTuoched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        inputHasError,
        valueInputChangeHandler,
        valueInputOnBlurHandler,
        reset,
    }
};

export default useInput;