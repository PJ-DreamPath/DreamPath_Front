import { css } from '@emotion/react';

export const header = css`
  box-sizing: border-box;
  padding: 5rem 10rem;

  width: 100%;
  height: auto;

  background-color: #1681ff;
`;

export const logo = css`
  display: inline-block;
  cursor: pointer;
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  width: 15rem;
  height: auto;

  img {
    width: 100%;
    height: auto;
  }
`;

export const nav = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10rem;

  margin-top: 3rem;

  width: 100%;

  a {
    display: inline-block;
    box-sizing: border-box;
    padding: 0.5rem 0;

    font-size: 1.8rem;
    text-decoration: none;
    color: #fff;
    &:hover{
      color: #ffffff83;
    }
  }
`;
