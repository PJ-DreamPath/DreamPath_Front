import { css } from '@emotion/react';
export const container = css`

  min-height: 100vh;
  width: 100%;
  & > h3 {
    font-size: 2.4rem;
    margin: 0;
    color: #1681ff;
  }
`;


export const purchaseSection = css`
  background: white;
  box-sizing: border-box;
  display: flex;
  padding: 2.5rem;
  padding-right: 15rem;
  width: 100%;
  margin-bottom: 20px;
`;


export const option = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  width: 30%;
  padding: 2rem;
  border: none;
  border-radius: 5px;
  margin-right: 3rem;
  height: 35rem;
  
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10%;


  & > span:nth-of-type(1) {
    font-size: 1.8rem;
    font-weight: 700;
  }

  & > span:nth-of-type(2) {
    font-size: 2.5rem;
    font-weight: 800;
  }
`;

export const optionButton = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > span {
        margin-bottom: 1rem;
        font-size: 2rem;
    }

    & > button {
        background-color: #1681ff;
        border: none;
        border-radius: 10%;
        font-weight: 600;
        color: white;
        width: 100%;
        height: 3rem;
        cursor: pointer;
        &:hover {
            background-color: #007bff;
        }
        &:active {
            background-color: #007bdd;
        }
    }
`;