import { css } from '@emotion/react';


export const profileSection = css`
  background: #fff;
  padding: 7rem;
  border-radius: 1.5rem;
  box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.1);
`;

export const profileContent = css`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const profileImage = css`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: #ccc;
`;

export const nicknameBox = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  

  input {
    display: flex;
    
    border: none;
    background: #f5f5f5;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  button {
    background: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
  }
`;

export const infoSection = css`
  margin-top: 2rem;
  background: #fff;
  padding: 8rem;
  border-radius: 1.5rem;
  box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.1);
`;

export const infoHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const deleteBtn = css`
  background: #ef4444;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: none;
`;

export const infoContent = css`
  margin-top: 1rem;
`;

export const infoRow = css`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    background: #f5f5f5;
  }

  button {
    background: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    border: none;
  }
`;
