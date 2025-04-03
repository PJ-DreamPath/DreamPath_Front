
import { css } from '@emotion/react';

export const body = css`
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    height: 320px;
    width: 100%;
`

export const signinUserBox = css`
    box-sizing: border-box;
    background: #007bff;
    color: white;
    padding: 10px ;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 100%;
    text-align: center;

    & > div > label {
        display: flex;
        justify-content: flex-start;
        padding-left: 10px;
        margin-top: 5px;
        margin-bottom: 1px;
        color: white;
        font-size: 12px;
        font-weight: 600;
    }

    & > div > input {
        width: 85%;
        padding: 8px 0px 10px 5px;
        margin: 10px 0 10px;
        border: none;
        border-bottom: 2px solid white;
        font-size: 10px;
        background-color: transparent;
        color: white;
        outline: none;
        font-weight: 600;
        &::placeholder{
            color: #ddd;
        }
    }
`

export const buttonContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
`
export const googleButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    width: 90%;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    position: relative;
    font-weight: 600;

    & > svg {
        position: absolute;
        left: 10px;
    }
`

export const naverButton = css`
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    width: 90%;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    position: relative;
    font-weight: 600;

    & > svg {
        position: absolute;
        left: 10px;
    }
`

export const loginButton = css`
    margin-top: 8px;
    width: 90%;
    padding: 7px;
    border-radius: 5px;
    border: none;
    font-weight: 1000;
    color: #007bff;
    cursor: pointer;
`
export const signupButton = css`
    margin-top: 20px;
    border: none;
    color: #eeeeee;
    background-color: transparent;
    font-weight: 500;
    cursor: pointer;

`;


