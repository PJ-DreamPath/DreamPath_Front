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

    button {
        display: inline-block;

        box-sizing: border-box;
        outline: none;
        border: none;
        border-radius: 0.5rem;

        width: 10rem;
        height: 4rem;

        color: #fff;

        background-color: #1681ff;
        &:hover{
            background-color: #146bce;
            cursor: pointer;
        }
    }
`;

export const searchBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    padding: 0.5rem 1rem;
    border: 1px solid #cccccc;
    border-radius: 0.5rem;

    width: 40rem;
    height: 100%;

    input {
        display: inline-block;
        outline: none;
        border: none;

        width: calc(100% - 2.5rem);
    }

    svg {
        font-size: 2rem;
    }
`;

export const tableWrapper = css`
    margin-bottom: 2rem;
    border-radius: 8px;

    /* height: 50rem; */
    overflow-x: auto;

    background: white;
`;

export const table = css`
    border-collapse: collapse;
    width: 100%;

    thead {
        tr {
            background-color: #f8f9fa;
            border-bottom: 2px solid #ddd;

            th {
                box-sizing: border-box;
                padding: 1rem;

                font-weight: bold;
                text-align: center;

                &:first-of-type {
                    width: 50rem;
                }
            }
        }
    }

    tbody {
        tr {
            box-sizing: border-box;
            border-bottom: 1px solid #ddd;

            transition: background-color 0.2s ease-in-out;

            &:hover {
                background-color: #f1f1f1;
            }

            td {
                box-sizing: border-box;
                padding: 1rem;

                font-size: 1.3rem;
                text-align: center;

                &:first-of-type {
                    display: inline-block;

                    width: 50rem;
                    overflow: hidden;

                    text-align: left;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                }

                & > svg {
                    display: inline-block;
                    vertical-align: sub;
                    margin-right: 0.5rem;
                }
                & > span {
                    display: inline-block;
                    width: 1rem;

                    vertical-align: middle;
                }
            }
        }
    }
`;

export const tdTitle = css`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const writer = css`
    margin: 0 auto;
    width: 10rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const footer = css`
    display: flex;
    justify-content: center;
    margin-right: 5rem;
    margin-top: 5rem;
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
    background-color: ${isSelect ? '#eeeeee' : '#ffffff'} !important;
`;
