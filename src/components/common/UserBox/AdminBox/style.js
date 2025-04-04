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

export const nickname = css`
    font-size: 16px;
    font-weight: bold;
    margin-top: 8px;
    overflow: hidden;
    &:hover {
        overflow: visible;
        cursor: default;
    }
`;

export const joinDate = css`
    font-size: 12px;
    color: #ddd;
    margin-top: 4px;

    cursor: default;
`;

export const mentorSection = css`
    margin-top: 10px;
    font-size: 14px;
`;

export const starRating = css`
    color: gold;
    font-size: 16px;
    margin-top: 4px;
`;

export const mentoringInfo = css`
    font-size: 12px;
    margin-top: 6px;
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
