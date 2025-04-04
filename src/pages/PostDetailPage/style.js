import { css } from '@emotion/react';

export const titleBox = css`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
`;

export const left = css`
    width: calc(100% - 55rem - 16rem);
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
    width: 60rem;

    h2 {
        margin: 0;
        width: fit-content;
        max-width: 44rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 3rem;
    }
`;

export const buttonContainer = css`
    /* display: flex;
    justify-content: end;
    align-items: center;
    gap: 1rem; */

    margin-left: auto;
    button {
        margin-right: 1.5rem;
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

    width: 55rem;

    & > p {
        font-size: 1.3rem;
        color: #aaa;

        &:nth-of-type(1) {
            width: 10rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

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

export const toggleBox = (isRecruiting, isOkay) => css`
    box-sizing: border-box;
    padding: 0.4rem;
    outline: none;
    border: none;
    border-radius: 5rem;
    height: 2.8rem;
    aspect-ratio: 1.7 / 1;
    background-color: ${isRecruiting ? '#1681ff' : '#aaa'};
    cursor: ${isOkay ? 'pointer' : 'default'};

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

export const detailInfoBox = css`
    margin-top: 2rem;
`;

export const row = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;

    width: 100%;
    height: 3rem;

    p,
    span {
        display: inline-block;
        font-size: 1.3rem;
    }
    p {
        border-right: 1px solid #aaa;
        margin-right: 1rem;
        width: 8rem;
    }
`;

export const fileClick = css`
    cursor: pointer;
`;

export const contentBox = css`
    padding: 2rem 0;
    width: 100%;
    height: auto;
    min-height: 15rem;

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

export const mapBox = css`
    & > p {
        font-size: 2.4rem;
        font-weight: bold;
        color: #1681ff;

        span {
            font-size: 1.6rem;
            font-weight: normal;
            color: #333;

            &:first-of-type {
                margin-left: 2rem;
            }
        }
    }
`;

export const here = css`
    width: 10rem;
    aspect-ratio: 1 / 1;
    position: relative;

    p {
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;

        position: absolute;
        left: 50%;
        top: -6.4rem;
        transform: translate(-50%, 0);

        box-sizing: border-box;
        border: 0.5rem solid #1683ff;
        border-radius: 50%;

        width: 100%;
        aspect-ratio: 1 / 1;

        background-color: #f1f5fd;

        span {
            display: block;

            &:first-of-type {
                font-size: 1.6rem;
                // font-size: var(--fs-16);
            }
            &:last-of-type {
                font-size: 1.4rem;
                font-weight: bold;
            }
        }
    }

    &::before {
        content: '';
        width: 2rem;
        aspect-ratio: 1 / 1;
        background-color: #1683ff;
        position: absolute;
        left: 50%;
        top: 20%;
        transform: translate(-50%, 0) rotate(45deg);
        z-index: -1;
    }

    &::after {
        content: '';
        width: 1rem;
        aspect-ratio: 1 / 1;
        background-color: #1683ff;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
    }
`;

export const btnBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    margin-top: 3rem;

    width: 100%;

    button {
        box-sizing: border-box;
        padding: 0.8rem 0;
        border: none;
        border-radius: 1rem;

        width: 13rem;

        font-size: 1.8rem;
        text-align: center;

        background-color: #fff;
        box-shadow: 0.4rem 0.4rem 1.3rem rgba(0, 0, 0, 0.12);
          cursor: pointer;

        &.update,
        &.regist {
            color: #fff;
            background-color: #1683ff;
        }
        &.del {
            color: #fff;
            background-color: red;
        }
        &:disabled {
            background-color: #dbdbdb;
            cursor: default;

        }
       
          

    }
`;

// 댓글

export const commentContainer = css`
    width: 100%;
    margin-top: 1.5rem;
    border-radius: 1rem;
    background-color: #fff;
`;

export const commentTopBox = css`
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    width: 100%;
    height: 50%;
    border-bottom: solid 0.1rem #dbdbdb;
`;

export const userInfo = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const img = css`
    overflow: hidden;
    width: 6rem;
    height: 6rem;
    background-color: #dbdbdb;
    border-radius: 50%;

    img {
        display: inline-block;
        width: 100%;
        height: auto;
    }
`;

export const info = css`
    margin-left: 1.5rem;

    & > p {
        margin: 0;
    }
`;
export const nickname = css`
    font-size: 1.6rem;
    font-weight: bold;
`;

export const date = css`
    color: #aaa;
`;

export const starPointBox = css`
    display: flex;
    gap: 1rem;
    font-size: 2.5rem;
    cursor: pointer;
    svg {
        &.on {
            path {
                color: gold;
            }
        }
        path {
            color: #aaa;
        }
    }
`;
export const commentBottonBox = css`
    width: 100%;
    padding: 2rem;
    box-sizing: border-box;

    & > textarea {
        width: 100%;
        resize: none;
        height: 10rem;
        border: none;
        outline: none;

        &::placeholder {
            color: #aaa;
            font-weight: bold;
        }
    }
`;

export const commentBox = css`
    box-sizing: border-box;
    margin-top: 10rem;
    padding-top: 5rem;
    width: 100%;
    height: 100%;
    background-color: #f1f5fd;
    position: relative;
    z-index: 1;
    padding: 5rem 5rem 0;

    ::before {
        content: '';
        width: 100vw;
        height: 100%;
        position: absolute;
        left: -40rem;
        top: 0;
        background-color: #f1f5fd;
        z-index: -1;
    }
`;
export const footer = css`
    display: flex;
    justify-content: center;
    margin-right: 5rem;
    margin-top: 1rem;
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

export const saveAndCount = css`
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
`;

export const reviewCount = css`
    font-size: 1.5rem;
    font-weight: bold;
`;

export const commentSave = css`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 8rem;
    height: 3rem;
    border-radius: 0.5rem;
    background-color: #1681ff;
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
    border: none;
    &:hover{
        cursor: pointer;
        background-color: #5a9eec;

    }
`;

export const commentReviewBox = css`
    position: relative;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    margin: 3rem 4rem 2rem 4rem;
    width: auto;
    height: 30rem;
    background-color: #ffffff;
`;

export const profile_section = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rem;
    width: 100%;
`;

export const profile_img = css`
    overflow: hidden;
    width: 6rem;
    height: 6rem;
    margin-left: 3rem;
    border-radius: 50%;

    & > img {
        width: 100%;
    }
`;

export const profile_Info = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 1.5rem;
`;

export const saveNickname = css`
    font-size: 1.5rem;
    font-weight: bold;
`;

export const createDate = css`
    white-space: nowrap;
`;

export const comment_action = css`
    display: flex;
    justify-content: flex-end;
    margin-right: 3rem;
    gap: 1.5rem;
    width: 100%;
`;

export const line = css`
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-top: 3px solid rgba(201, 201, 201, 0.3);
`;

export const updateBox = css`
    width: 10rem;
    height: 3.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #1681ff;
    color: #fafafa;
    font-weight: bold;
    &:hover{
        cursor: pointer;
        background-color: #5a9eec;

    }
`;
export const deleteBox = css`
    width: 10rem;
    height: 3.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: red;
    color: #fafafa;
    font-weight: bold;
    &:hover{
        cursor: pointer;
        background-color: #dc6666;

    }
`;

export const starPoint = css`
    font-size: 3rem;
    letter-spacing: 1.5rem;
    line-height: 1;
    cursor: pointer;
`;

export const review = css`
    position: absolute;
    bottom: 10%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 0.5rem;
    height: auto;
    color: #000000;
`;
