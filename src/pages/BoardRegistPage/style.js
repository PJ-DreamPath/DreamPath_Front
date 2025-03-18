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

export const contentBox = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 4rem;

    width: 100%;

    & > div {
        width: 100%;

        &:not(:first-of-type) {
            label,
            div {
                width: 100%;
            }

            label {
                display: inline-block;

                margin-bottom: 1rem;
                font-size: 1.6rem;
                font-weight: bold;

                &::before {
                    content: '*';
                    color: red;
                    margin-right: 0.5rem;
                }
            }
            input {
                box-sizing: border-box;
                padding: 0 1rem;
                border: 1px solid #aaa;
                border-radius: 1rem;

                width: 100%;
                height: 4rem;
            }
        }
    }
`;

export const topBox = css`
    box-sizing: border-box;
    border: 1px solid #aaa;
    padding: 1rem;
    border-radius: 1rem;

    width: 100%;
    height: 7rem;

    input {
        box-sizing: border-box;
        outline: none;
        border: none;

        width: 100%;
        height: 100%;

        font-size: 2rem;
    }
`;
export const qullBox = css`
    box-sizing: border-box;
    border: 1px solid #aaa;
    border-radius: 1rem;

    width: 100%;
    height: 50rem;

    & .ql-toolbar {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 1rem;

        border: none;
        border-bottom: 0.1rem solid #aaa;

        &.ql-snow {
            padding: 0.8rem;

            & .ql-formats {
                margin-right: 0;
            }
        }
    }
    & .ql-container {
        border: none;

        height: 100%;
    }
`;

export const dtBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    width: 100%;
`;
