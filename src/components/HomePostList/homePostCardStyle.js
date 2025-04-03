import { css } from '@emotion/react';

export const cardBox = css`
    box-sizing: border-box;
    padding: 2rem;
    border-radius: 3rem 3rem 3rem 0;
    cursor: pointer;
    width: calc((100% - 3rem) / 4);
    height: auto;

    background-color: #fff;
    box-shadow: 0.4rem 0.4rem 1.3rem rgba(0, 0, 0, 0.12);
    &:hover{
        
    box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.12);
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

    & svg path {
        color: #ff3b30;
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

        &:first-of-type {
            margin: 0;
            height: 7rem;
            font-size: 1.6rem;
            font-weight: bold;
            -webkit-line-clamp: 3;
        }
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

            width: 10rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
`;

export const starBox = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.5rem;
    margin: 0 1rem;

    path {
        color: #ffcc00;
    }
`;
