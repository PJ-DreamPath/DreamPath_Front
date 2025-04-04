import { css } from '@emotion/react';

export const userBoxContainer = css`
    width: auto;
    background-color: #007aff;
    color: white;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const profileImage = css`
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
    background-color: white;
    height: 12rem;
    width: 60%;
    display: inline-block;
    overflow: hidden;
    position: relative;
    & > img {
        width: 100%;
        height: auto;

        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    & > input[type='file'] {
        display: none;
    }
`;

export const profileImgeContainer = css``;

export const nickname = css`
    font-size: 17px;
    font-weight: bold;
    margin-top: 8px;
    white-space: nowrap;
    overflow: hidden;
    color: #ddd;

    text-overflow: ellipsis;
    cursor: default;
`;

export const joinDate = css`
    font-size: 12px;
    color: #ddd;
    margin-top: 4px;

    cursor: default;
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

export const mentoringInfo = css`
    font-size: 12px;

    margin-top: 6px;
    & > div {
        color: #ddd;
    }
`;
export const buttonContainer = css`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

export const styledButton = css`
    flex: 1;
    background-color: white;
    color: #007aff;
    border: none;
    padding: 8px;
    margin: 5px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #e0e0e0;
    }
`;

export const logoutLink = css`
    display: block;
    margin-top: 10px;
    font-size: 12px;
    color: white;
    text-decoration: none;
    cursor: pointer;
    opacity: 0.8;

    &:hover {
        opacity: 1;
        text-decoration: underline;
    }
`;

export const modalOverlay = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`;

export const modalContent = css`
    background: white;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const modalImage = css`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
`;

export const closeButton = css`
    margin-top: 10px;
    padding: 10px;
    cursor: pointer;
    background: red;
    color: white;
    border: none;
    border-radius: 5px;
`;
