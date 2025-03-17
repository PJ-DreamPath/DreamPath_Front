/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';

function ValidInput({
    type ="text",
    name ="", 
    placeholder="", 
    value, 
    onChange = null,
    onFocus = null,
    regexp = null, 
    errorMessage = "",
    inputValidError = null,
    setInputValidError = null,
}) {

    const handleOnBlur = () => {
        if(!regexp){
            return;
        }

        setInputValidError(prev => ({
            ...prev,
            [name]: !regexp.test(value),
        }));
        
    }

    return (
        <div>
             <div css={s.groupBox}>
                <input css={s.textInput}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value = {value}
                    onBlur={handleOnBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                />
                {
                    !!inputValidError && 
                    !!inputValidError[name] &&
                    <p css={s.messageText}>{errorMessage}</p>
                }
            </div>
        </div>
    );
}

export default ValidInput;