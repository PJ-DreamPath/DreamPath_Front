import { css } from "@emotion/react";




export const layout = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 10rem;
    background-color: #303740;
`;

export const job = css`

    & div {
        font-size: 1.5rem;
        margin-left: 8rem;
        line-height: 2.5rem;
        color: #ffffff;
    }
`;

export const dreamPath =css`
        text-align: center;
        font-size: 2.5rem !important;
        letter-spacing: -0.1rem;
        font-weight: bold;
        color: #ffffff;
    `;


export const nameAndEmail = css`

    & div {
        font-size: 1.3rem;
       
        text-align: left;
        line-height: 2rem;
        color: #ffffff;
    }
`;
export const nameAndEmailLast = css`

    & div {
            font-size: 1.3rem;
            margin-right: 14rem;
            text-align: left;
            line-height: 2rem;
            color: #ffffff;
    }
`;