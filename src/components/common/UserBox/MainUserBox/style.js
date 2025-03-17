import { css } from '@emotion/react';

export const body = css`
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    height: 320px;
    width: 100%;
`;

export const mainUserBox = css`
    box-sizing: border-box;
    background: #007bff;
    color: white;
    padding: 10px ;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 100%;
    text-align: center;
`;

export const profileImg = css`
    display: flex;
    align-items: center;
    margin-bottom: 1px;
    padding: 10px 15px;

    img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        background-color: white;
        margin-right: 20px;
    }

    p {
        color: #eeeeee;
        font-size: 12px;
        margin-bottom: 10px;
        font-weight: 800;
    }
`

export const starPoint = css`
    display: flex;
    align-items: center;
    justify-content: center;

    p { 
        font-size: 15px;
        font-weight: 500;
        color: #eeeeee;
        padding-left: 25px;
        padding-right: 3px;
    }
`;

export const mentoringButton = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    button {
        background-color: transparent;
        border: none;
        color: white;
        font-size: 15px;
        font-weight: 500;
        padding: 3px 5px 5px 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            padding-left: 5px;
            color: white;
            flex: 1;
        }

        svg {
            padding: 0 5px 0 5px;
            fill: #eeeeee;
            width: 16px;
            height: 16px;
        }
    }
`;

export const footerButton = css`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px; 

    button {
        margin-top: 30px;
        background-color: white;
        border: none;
        color: black;
        font-size: 13px;
        font-weight: 700;
        padding: 8px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;

        &:hover {
            background-color: #e0e0e0;
        }
    }
`;

export const logoutButton = css`
    text-align: center;
    color: #eeeeee;
    font-size: 12px;
    margin-top: 10px;
    cursor: pointer;
    background-color: transparent;
    border: none;
`

export const mentiBox = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    
    p {
        font-size: 15px;
        font-weight: 500;
        color: #eeeeee;
    }
`

export const mentiMentoringButton = css`
        background-color: transparent;
        border: none;
        color: white;
        font-size: 15px;
        font-weight: 500;
        padding: 3px 5px 5px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        span {
            padding-left: 50px;
            color: white;
            flex: 1;
        }

        svg {
            padding: 0 5px 0 5px;
            fill: #eeeeee;
            width: 16px;
            height: 16px;
        }    
`

export const myPageButton = css`
        width: 80%; 
        margin: 50px auto 0 auto;
        background-color: white;
        border: none;
        color: black;
        font-size: 13px;
        font-weight: 700;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
`




