import { css } from '@emotion/react';

export const boardContainer = css`
    display: flex;
    gap: 7rem;
    justify-content: center;
    padding: 3rem 10rem;
    width: 100%;
    box-sizing: border-box;
    height: auto;
    background-color: #ffffff;
`;

export const board = css`
    box-sizing: border-box;

    width: 50%;
    border-radius: 4rem;
    border: solid 0.1rem #dbdbdb;
    padding: 3rem;
`;

export const boardHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    & > h1 {
        font-size: 2rem;
        color: #1681ff;
    }

    & > span {
        font-size: 1.5rem;
        color: #9c9898;
        cursor: pointer;
    }
`;

export const row = css`
    display: flex;
    cursor: pointer;
    padding: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    & > div:nth-of-type(1) {
        text-align: start;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: calc(100% - 20rem);
    }

    & > div:nth-of-type(2) {
        width: 10rem;
    }

    & > div:nth-of-type(3) {
        width: 10rem;
    }

    & > div {
        margin: 1rem 0;
        font-size: 1.5rem;
        padding: 1rem;
    }

    &:hover {
        background-color: #eeeeee;
    }
`;

export const write = css`
    width: 10rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;
