import { css } from '@emotion/react';

export const titleBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 5rem;

    width: 100%;

    & h3 {
        margin: 0;
        padding: 0;
        font-size: 2.4rem;
        font-weight: bold;
        color: #1681ff;
    }
`;

export const searchWrap = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;

    height: 4rem;

    input {
        display: inline-block;

        box-sizing: border-box;
        padding: 0.5rem 1rem;
        border: 1px solid #cccccc;
        border-radius: 0.5rem;

        width: 40rem;
        height: 100%;
    }
`;

export const listBox = css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;

    width: 100%;
`;
