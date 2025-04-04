import { css } from '@emotion/react';

export const sideMenuBox = css`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0.8rem;

    box-sizing: border-box;
    padding: 3rem 5rem 3rem 6rem;
    margin-top: 3rem;
    border-radius: 2rem;

    width: 100%;
    max-height: 50rem; //레이아웃 합칠떄 수정 필요

    box-shadow: 0.4rem 0.4rem 1.3rem rgba(0, 0, 0, 0.12);

    li {
        width: 100%;
        a {
            width: 100%;
            font-size: 1.6rem;
            text-decoration: none;
        }
        &:hover{
            background-color: #eeeeee;
            cursor: pointer;
        }
    }
`;

export const click = (isClick) => css`
    color: ${isClick ? ' #1368FF' : '#333'};

    a {
        color: ${isClick ? ' #1368FF' : '#333'};
    }
`;
