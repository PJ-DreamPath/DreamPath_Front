import { css } from "@emotion/react";

export const quillEditor = css`
    flex-grow: 1;
    box-sizing: border-box;
    height: 60rem;


   .ql-toolbar {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    border-bottom: 0.1rem solid #dbdbdb;
   }

   .ql-container{
    border:none;
    height: 85%;
   }
`;


export const quillTop = css`
    display: flex;
    
    & > input {
        box-sizing: border-box;
        flex-grow: 1;
        margin-right: 1rem;
        outline: none;
        border: 0.1rem solid #dbdbdb;
        border-radius: 0.5rem;
        padding: 0 1.5rem;
    }

`;


export const saveButton = css`
    border: 0.1rem solid #dbdbdb;
    box-sizing: border-box;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    border-radius: 0.5rem;
    background-color: #fafafa;
    cursor: pointer;

    &:hover{
        background-color: #eeeeee;
    }
    &:active{
        background-color: #dddddd;
    }
`;