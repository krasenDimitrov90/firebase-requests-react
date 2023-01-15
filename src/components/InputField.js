import React from "react";

const InputField = (props) => {

    return (
        <div>
            <label htmlFor={props.htmlFor}>{props.label}</label>
            <input 
                type={props.type} 
                id={props.id}
                name={props.name}
                value={props.value}
                onBlur={props.onBlurHandler} 
                onChange={props.onChangeHandler}
            />
        </div>
    );
};

export default InputField;