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
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
