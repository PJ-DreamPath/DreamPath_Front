import { css } from "@emotion/react";

export const groupBox = css`
    box-sizing: border-box;
    padding: 0.6rem 0;
    width: 50rem;
`;

export const textInput = css`
    padding: 1rem;
    font-size: 1.6rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    width: 100%;

    &:focus {
        box-shadow: 0rem 0rem 0.2rem 0.2rem #7edaff;
    }
`;

export const messageText = css`
    margin: 0;
    margin-top: 0.3rem;
    color: #ff3f3f;
    font-size: 1.2rem;
`;