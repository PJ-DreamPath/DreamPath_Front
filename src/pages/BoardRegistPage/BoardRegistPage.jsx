/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetBoards } from '../../queries/boardQuery';
import Select from 'react-select';
import { useGetMentoringCategories } from '../../queries/mentoringQuery';
import DaumPostcode from 'react-daum-postcode';
import { IoClose } from 'react-icons/io5';
import { DatePicker } from '@mui/x-date-pickers';

export default function BoardRegistPage({}) {
    const navigation = useNavigate();
    const pathNm = useParams();

    // boardList
    const boardList = useGetBoards();

    const [board, setBoard] = useState({});

    useEffect(() => {
        if (boardList && boardList.data && boardList.data.data) {
            let newArray = boardList.data.data.filter(
                (board) => board.boardName == pathNm.boardName
            )[0];
            setBoard(newArray);
        }
    }, [boardList.data]);

    // quill
    const contaiinerQuillRef = useRef();

    const [quill, setQuill] = useState(null);

    useEffect(() => {
        const toolbarOptions = [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
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
            setRegistData((prev) => ({
                ...prev,
                content: quill.root.innerHTML,
            }));
        });
    }, []);

    // 카테고리 리스트 데이터
    const categories = useGetMentoringCategories();
    const [categoriesSelectOption, setCategoriesSelectOption] = useState();

    useEffect(() => {
        if (categories && categories.data && categories.data.data) {
            const newArray = [];
            categories.data.data.map((category) =>
                newArray.push({
                    value: category.mentoringCategoryId,
                    label: category.mentoringCategoryName,
                })
            );

            setCategoriesSelectOption(newArray);
        }
    }, [categories.data]);

    // 주소 찾기 모달
    const [findAddressModalOpen, setFindAddressModalOpen] = useState();
    function handleFindAddressOnClick() {
        setFindAddressModalOpen(!findAddressModalOpen);
    }

    // 게시글 등록
    const [registData, setRegistData] = useState({
        boardId: board.boardId,
        mentoringCategoryId: 0,
        title: '',
        content: '',
        mentoringAddress: '',
        mentoringAddressDetail: '',
        startDate: '',
        endDate: '',
        status: '',
        attachedFiles: '',
    });

    useEffect(() => {
        console.log('registData', registData);
    }, [registData]);

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

        // 등록 보드 아이디
        setRegistData((prev) => ({
            ...prev,
            boardId: board.boardId,
        }));
    }, [board]);

    function handleInpOnChange(e) {
        setRegistData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

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
                        value={registData.title}
                        onChange={handleInpOnChange}
                    />
                </div>
                <div css={s.qullBox}>
                    <div css={s.qullBox} ref={contaiinerQuillRef}></div>
                </div>

                {board.boardId == 1 ? (
                    <>
                        <div css={s.selectBox} className="selectBox">
                            <label htmlFor="category">카테고리</label>
                            <Select
                                options={categoriesSelectOption}
                                name="mentoringCategoryId"
                                styles={{
                                    control: (style) => ({
                                        ...style,
                                        boxSizing: 'border-box',
                                        borderRadius: '1rem',
                                        borderColor: '#aaa',
                                        width: '100%',
                                        height: '4rem',
                                        minHeight: 'unset',
                                        fontSize: '1.3rem',
                                    }),
                                    dropdownIndicator: (style) => ({
                                        ...style,
                                        padding: '0.3rem',
                                    }),
                                }}
                                value={categoriesSelectOption.find(
                                    (option) =>
                                        option.value ===
                                        registData.mentoringCategoryId
                                )}
                                onChange={(option) => {
                                    setRegistData((prev) => ({
                                        ...prev,
                                        mentoringCategoryId: option.value,
                                    }));
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="">멘토링 일자</label>
                            <div css={s.dtBox}>
                                <DatePicker
                                    name="startDate"
                                    id="startDate"
                                    // value={registData.startDate}
                                    // onChange={handleInpOnChange}
                                />
                                <DatePicker
                                    name="endDate"
                                    id="endDate"
                                    // value={registData.endDate}
                                    // onChange={handleInpOnChange}
                                />
                            </div>
                        </div>
                        <div css={s.addressBox}>
                            <label htmlFor="address">주소</label>
                            <input
                                type="text"
                                name="mentoringAddress"
                                id="mentoringAddress"
                                value={registData.mentoringAddress}
                                disabled
                            />
                            <button
                                type="button"
                                onClick={handleFindAddressOnClick}
                            >
                                주소 찾기
                            </button>
                            <input
                                type="text"
                                name="mentoringAddressDetail"
                                id="mentoringAddressDetail"
                                onChange={handleInpOnChange}
                            />
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

            {/* 주소 찾기 모달창 */}
            <div css={s.findAddressModalBox(findAddressModalOpen)}>
                <div>
                    <p>
                        주소 찾기
                        <button
                            type="button"
                            onClick={handleFindAddressOnClick}
                        >
                            <IoClose />
                        </button>
                    </p>
                    <DaumPostcode
                        style={{
                            width: '50rem',
                            height: '45rem',
                        }}
                        onComplete={(data) => {
                            const detailAddress = '';

                            setFindAddressModalOpen(false);

                            setRegistData((prev) => ({
                                ...prev,
                                mentoringAddress: data.address,
                            }));
                        }}
                    />
                </div>
            </div>
        </>
    );
}
