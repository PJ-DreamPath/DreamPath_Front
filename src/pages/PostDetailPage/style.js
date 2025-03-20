import { css } from '@emotion/react';

export const titleBox = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
`;

export const left = css`
    width: calc(100% - 40rem - 16rem);
`;

export const breadCrumb = css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    border: none;
    outline: none;
    font-size: 1.3rem;
    font-weight: bold;
    color: #1681ff;

    background-color: #fff;

    svg {
        display: inline-block;

        font-size: 2rem;
        vertical-align: middle;

        path {
            color: #1681ff;
        }
    }
`;
export const title = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2rem;

    h2 {
        margin: 0;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 3rem;
    }
`;
export const starBox = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;

    svg {
        font-size: 2rem;

        path {
            color: #ffcc00;
        }
    }

    p {
        margin-left: 1rem;
        font-size: 1.3rem;
    }
`;

export const right = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;

    width: 40rem;

    & > p {
        font-size: 1.3rem;
        color: #aaa;

        &:not(:last-of-type):after {
            content: '';
            display: inline-block;

            margin-left: 1rem;
            width: 0.1rem;
            height: 1.5rem;

            vertical-align: sub;

            background-color: #aaa;
        }
    }
`;
export const toggleWrap = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-left: 2rem;

    p {
        font-size: 1.3rem;
    }
`;

export const toggleBox = (isRecruiting) => css`
    box-sizing: border-box;
    padding: 0.4rem;
    border-radius: 5rem;
    height: 2.8rem;
    aspect-ratio: 1.7 / 1;
    background-color: ${isRecruiting ? '#1681ff' : '#aaa'};

    span {
        display: block;
        border-radius: 50%;
        width: 2rem;
        aspect-ratio: 1 / 1;
        overflow: hidden;
        margin-left: ${isRecruiting ? '0' : 'auto'};

        background-color: #fff;
    }
`;

export const contentBox = css`
    padding: 2rem 0;
    width: 100%;
    height: auto;

    font-size: 1.6rem;
`;

export const likeBtn = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    box-sizing: border-box;
    padding: 2rem;
    margin: 0 auto;
    border: none;
    border-radius: 1rem;

    width: 20rem;
    text-align: center;
    background-color: #fff;
    box-shadow: 0.4rem 0.4rem 1.3rem rgba(0, 0, 0, 0.12);
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
        box-shadow: 0.6rem 0.6rem 1.6rem rgba(0, 0, 0, 0.2);
    }

    svg path {
        color: red;
    }
`;

export const mapBox = css``;

export const commentBox = css`
    margin-top: 10rem;
    padding-top: 5rem;
    width: 100%;
    background-color: #f1f5fd;
`;
