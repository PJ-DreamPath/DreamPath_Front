/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetBoards } from '../../queries/boardQuery';

export default function BoardRegistPage({}) {
    const navigation = useNavigate();
    const pathNm = useParams();

    // boardList
    const boardList = useGetBoards();

    const [board, setBoard] = useState({});

    useEffect(() => {
        if (boardList && boardList.data && boardList.data.data) {
            console.log(pathNm);
            let newArray = boardList.data.data.filter(
                (board) => board.boardName == pathNm.boardName
            )[0];
            setBoard(newArray);
        }
    }, [boardList.data]);

    useEffect(() => {
        // 권한 체크 및 페이지 체크
        if (!!localStorage.getItem('AccessToken')) {
            if (board.boardId > 3) {
                // 로그인 되어 있지만 등록 페이지가 없는 게시판일 경우 무조건 메인으로
                navigation('/');
            }
        } else {
            // 로그인 전이면 무조건 메인으로
            navigation('/');
        }
    }, [board]);

    // quill
    const contaiinerQuillRef = useRef();

    const [quill, setQuill] = useState(null);
    const [quillTitle, setQuillTitle] = useState('');
    const [quillContent, setQuillContent] = useState('');

    useEffect(() => {
        const toolbarOptions = [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ['link', 'image', 'video', 'formula'],
        ];

        const quill = new Quill(contaiinerQuillRef.current, {
            modules: {
                toolbar: toolbarOptions,
            },
            theme: 'snow',
            placeholder: 'Write, Enter your contents...',
        });

        setQuill(quill);

        quill.on('text-change', () => {
            setQuillContent(quill.root.innerHTML);
        });
    }, []);

    return (
        <>
            <div css={s.titleBox}>
                <h3>{board.boardNameKor} 등록</h3>
            </div>

            <div css={s.contentBox}>
                <div css={s.topBox}>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder={
                            board.boardId == 1
                                ? '제목에 자기 어필 내용을 요약해보세요.'
                                : '제목을 입력하세요.'
                        }
                    />
                </div>
                <div css={s.qullBox}>
                    <div css={s.qullBox} ref={contaiinerQuillRef}></div>
                </div>

                {board.boardId == 1 ? (
                    <>
                        <div>
                            <label htmlFor="category">카테고리</label>
                            <input type="text" name="category" id="category" />
                        </div>
                        <div>
                            <label htmlFor="">멘토링 일자</label>
                            <div css={s.dtBox}>
                                <input
                                    type="text"
                                    name="startDt"
                                    id="startDt"
                                />
                                <input type="text" name="endDt" id="endDt" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address">주소</label>
                            <input type="text" name="address" id="address" />
                            <input type="text" name="address" id="address" />
                        </div>
                        <div>
                            <label htmlFor="attachedFile">첨부파일</label>
                            <input
                                type="text"
                                name="attachedFile"
                                id="attachedFile"
                            />
                        </div>
                    </>
                ) : (
                    <input type="file" name="" id="" />
                )}
            </div>
        </>
    );
}
