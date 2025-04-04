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

export const contentBox = css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 4rem;

    width: 100%;

    & > div {
        width: 100%;

        &:not(:first-of-type) {
            label {
                display: inline-block;

                margin-bottom: 1rem;

                width: 100%;
                font-size: 1.6rem;
                font-weight: bold;

                &:not(.choice, .attachedFile):before {
                    content: '*';
                    color: red;
                    margin-right: 0.5rem;
                }
            }
        }

        &:not(:first-of-type, .selectBox) {
            div {
                width: 100%;
            }

            input,
            .attachedFile {
                box-sizing: border-box;
                padding: 0 1rem;
                border: 1px solid #aaa;
                border-radius: 1rem;

                width: 100%;
                height: 4rem;
                
            }

            .attachedFile {
                font-size: 1.6rem;
                font-weight: normal;
                line-height: 3.6rem;
                &:hover{
        background-color: #eeeeeec9;
        cursor: pointer;
    }
            }
        }
    }
`;

export const topBox = css`
    box-sizing: border-box;
    border: 1px solid #aaa;
    padding: 1rem;
    border-radius: 1rem;

    width: 100%;
    height: 7rem;

    input { 
        box-sizing: border-box;
        outline: none;
        border: none;

        width: 100%;
        height: 100%;

        font-size: 2rem;
   
    }
    &:hover{
        border-color: #766b6bf2;

    }
   
`;
export const qullBox = css`
    box-sizing: border-box;
    border: 1px solid #aaa;
    border-radius: 1rem;

    width: 100%;
    height: 50rem;
    &:hover{
        border-color: #7d6b6b;
    }

    & .ql-toolbar {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 1rem;

        border: none;
        border-bottom: 0.1rem solid #aaa;

        &.ql-snow {
            padding: 0.8rem;

            & .ql-formats {
                margin-right: 0;
            }
        }
    }
    & .ql-container {
        border: none;

        height: 100%;
    }
    & .ql-editor {
        height: calc(100% - 5rem);
    }
`;

export const selectBox = css`
    
`;

export const dtBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    width: 100%;

    input {
        border: none !important;
        font-size: 1.6rem;

        & + div {
            width: auto !important;
        }
        &:hover{
        background-color: #eeeeeeda;
        cursor: pointer;
    }
    }
`;

export const addressBox = css`
    input {
        &:first-of-type {
            margin-right: 1rem;
            margin-bottom: 0.5rem;

            width: calc(100% - 9rem) !important;
        }
    }

    button {
        box-sizing: border-box;
        padding: 1.2rem 0;
        outline: none;
        border: none;
        border-radius: 1rem;

        width: 8rem;

        color: #fff;

        background-color: #1681ff;
        cursor: pointer;
        &:hover{
                background-color: #1472de;

            }
    }
`;

export const btnBox = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    width: 100%;

    button {
        display: inline-block;
        box-sizing: border-box;
        padding: 1rem 5rem;
        outline: none;
        border: none;
        border-radius: 1rem;

        font-size: 1.6rem;
        color: #fff;
        
        background-color: red;
        &:hover{
                background-color: #da0707;

            }
        cursor: pointer;

        &:first-of-type {
            background-color: #1681ff;
            &:hover{
                background-color: #1472de;

            }
        }
    }
`;

export const findAddressModalBox = (findAddressModalOpen) => css`
    display: ${findAddressModalOpen ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    background-color: #3333335b;

    & > div {
        box-sizing: border-box;
        padding: 2rem 5rem;
        border-radius: 2rem;

        width: fit-content;
        background-color: #fff;

        p {
            display: flex;
            justify-content: space-between;
            align-items: center;

            font-size: 2rem;
            font-weight: bold;

            button {
                box-sizing: border-box;
                padding: 0;
                outline: none;
                border: none;

                width: 3rem;
                height: 3rem;

                background-color: #fff;
                cursor: pointer;

                svg {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
`;

