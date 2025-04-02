import { css } from '@emotion/react';

export const container = css`
    width: 90%;
    margin-top: -20px;
    margin-left: -30px;
    background-color: white;
    border-radius: 8px;

`;

export const title = css`
    font-size: 24px;
    font-weight: bold;
    color: #1681ff;
    margin-bottom: 20px;
`;

export const tableWrapper = css`
    overflow-x: auto;
    background: white;
    border-radius: 8px;
    margin-bottom: 2rem;
    height: 60rem;
`;

export const table = css`
    width: 100%;
    border-collapse: collapse;
    
`;

export const tableRowHeader = css`
    background-color: #f8f9fa;
    border-bottom: 2px solid #ddd;
`;

export const tableHeader = css`
    padding: 12px;
    font-weight: bold;
    text-align: center;

    
`;

export const tableRow = css`
    border-bottom: 1px solid #ddd;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #f1f1f1;
    }
`;

export const tableCell = css`
    padding: 12px;
    text-align: center;
    font-size: 1.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;


    &:nth-of-type(1) {
        width: 50rem;
        text-align: start;
    }

    &:nth-of-type(2) {
        
        width: 5rem;
        display: inline-block;
        cursor: pointer;
    }
    & > span:nth-of-type(1) {
        position: relative;
        margin-right: 1rem;
        cursor: default;
        font-size: 1rem;
        padding-top: 1rem;
    }
    
`;

export const countBox = css`
    display: inline-block;
    width: 1rem;
`;
export const deleteButton = css`
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;

    &:hover {
        color: red;
    }
`;

export const pagination = css`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const pageButton = css`
    padding: 8px 12px;
    margin: 0 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #1681ff;
        color: white;
    }
`;

export const titleSelectBar = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

export const footer = css`
    display: flex;
    justify-content: center;
    margin-right: 5rem;
    
`;

export const pageNumbers = css`
    display: flex;

    & > button {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        margin-right: 0.5rem;
        border: 0.1rem solid #dbdbdb;
        border-radius: 0.5rem;
        width: 2.5rem;
        height: 2.5rem;
        font-weight: 600;
        font-size: 1.2rem;
        cursor: pointer;
        background-color: #ffffff;

        &:hover {
            background-color: #eeeeee;
        }

        &:disabled {
            background-color: #fafafa;
        }

        & > span {
            margin-bottom: 0.1rem;
        }
    }
`;



export const pageNum = (isSelect) => css`
    background-color: ${isSelect ? "#eeeeee" : "#ffffff"} !important;
`;
export const searchInputBox = css`
    position: absolute;
    right: 0;
    margin-right: 2rem;
    margin-left: 1rem;
    
    
    height: 3rem;

    & > input {
        box-sizing: border-box;
        outline-color: #2684ff;
        border: 0.1rem solid #dbdbdb;
        border-radius: 0.4rem;
        padding: 0 4rem 0 1rem;
        width: 20rem;
        height: 100%;
        font-size: 1rem;
    }

    & > button {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        right: 0;
    }
`;

export const emptyButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    padding: 0.6rem 1.2rem;
    background-color: transparent;
    font-size: 1.6rem;
    font-weight: 600;

`;

export const searchTextContainer = css`
    position: relative;
    margin-bottom: 3rem;
    flex-grow: 1;
    & > input {
        right: 0;
    }
`;
