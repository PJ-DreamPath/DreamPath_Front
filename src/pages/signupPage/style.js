import { css } from "@emotion/react";

export const header = css`
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    padding: 5rem 10rem;
    width: 100%;
    height: auto;
    background-color: #1681ff;
`;

export const logo = css`
    display: inline-block;
    box-sizing: border-box;
    margin: 0;
    width: 15rem;

    img {
        width: 100%;
        height: auto;
    }
`;

export const signup = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const container = css`
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #eeeeee;
`;

export const inputContainer = css`
    background-color: #f1f5fd;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80rem;
`;

export const signupHeader = css`
    font-size: 4rem;
    margin-top: 8rem;
`;

export const inputBox = css`
    display: flex;
    flex-direction: column;
    width: 50rem;
    margin: 2rem 0;

    span {
        font-size: 1.6rem;
        margin-bottom: 0.5rem;
    }

    input, select {
      
      box-sizing: border-box;
        padding: 1rem;
        font-size: 1.6rem;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
    }
`;

export const signupButton = css`
    width: 50rem;
    padding: 1rem;
    margin-top: 2rem;
    margin-bottom: 18rem;
    font-size: 1.8rem;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

