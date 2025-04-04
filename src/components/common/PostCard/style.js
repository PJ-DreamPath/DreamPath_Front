import { css } from '@emotion/react';

export const cardBox = css`
    box-sizing: border-box;
    padding: 2rem;
    border-radius: 3rem 3rem 3rem 0;

    width: calc((100% - 3rem) / 4);
    height: auto;

    background-color: #fff;
    box-shadow: 0.4rem 0.4rem 1.3rem rgba(0, 0, 0, 0.12);
    &:hover {
        cursor: pointer;
        box-shadow: 1rem 1rem 1rem rgba(0, 0, 0, 0.12);
    }
`;

export const top = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const chip = (status) => css`
    display: inline-block;

    box-sizing: border-box;
    padding: 0.5rem 0;
    border-radius: 0.5rem;

    width: 8rem;

    font-size: 1.1rem;
    text-align: center;
    color: #fff;

    background-color: ${status ? '#1681ff' : '#aaa'};
`;

export const heartBox = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;

    font-size: 1.3rem;

    & svg {
        display: inline-block;
        margin-top: 0.3rem;
        path {
            color: #ff3b30;
        }
    }
`;

export const titleBox = css`
    box-sizing: border-box;
    padding: 2rem 0;
    margin-bottom: 2rem;
    border-bottom: 1px solid #ccc;

    & P,
    & > div {
        margin: 0;
    }

    & > p,
    & > div {
        display: -webkit-box;
        margin-top: 3rem;

        height: 3.7rem;
        overflow: hidden;

        font-size: 1.3rem;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

        word-break: break-all;

        &:first-of-type {
            margin: 0;
            height: 7rem;
            font-size: 1.6rem;
            font-weight: bold;
            -webkit-line-clamp: 3;
        }
    }

    & > span {
        margin-top: 0.5rem;
        font-size: 1.2rem;
    }
`;

export const infoBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 1.3rem;

    & > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        & > p {
            color: #aaa;
            width: 4rem;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
`;

export const starBox = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 0.5rem;
    height: 2.2rem;
    margin-left: auto;
    margin-right: 1rem;

    p {
        margin: 0;
        font-size: 1.5rem;
    }

    path {
        color: #ffcc00;
    }
`;
