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
import moment from 'moment/moment';
import { useRegistPostMutation } from '../../mutations/postMutation';
import Swal from 'sweetalert2';

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
        startDate: moment(),
        endDate: moment(),
    });

    useEffect(() => {
        console.log('registData', registData);
    }, [registData]);

    const [attacheFile, setAttachedFile] = useState(null);

    function handleInpOnChange(e) {
        setRegistData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    const registPostMutation = useRegistPostMutation();
    async function handleRegistPostBtnOnClick() {
        if (!registData.title) {
            await Swal.fire({
                titleText: '게시글 제목을 입력하세요.',
                icon: 'error',
                timer: 1000,
                showConfirmButton: false,
            });
            return;
        } else if (!registData.content) {
            await Swal.fire({
                titleText: '게시글을 입력하세요.',
                icon: 'error',
                timer: 1000,
                showConfirmButton: false,
            });
            return;
        }

        if (board.boardName === 'mentoring') {
            // 멘토링이면
            if (
                !registData.mentoringCategoryId ||
                registData.mentoringCategoryId === 0
            ) {
                await Swal.fire({
                    titleText: '카테고리를 선택해주세요.',
                    icon: 'error',
                    timer: 1000,
                    showConfirmButton: false,
                });
                return;
            } else if (!registData.startDate || !registData.endDate) {
                await Swal.fire({
                    titleText: '멘토링 날짜를 선택해주세요.',
                    icon: 'error',
                    timer: 1000,
                    showConfirmButton: false,
                });
                return;
            } else if (registData.startDate > registData.endDate) {
                await Swal.fire({
                    titleText:
                        '멘토링 종료 날짜는 시작 날짜 이전일 수 없습니다.',
                    icon: 'error',
                    timer: 1000,
                    showConfirmButton: false,
                });
                return;
            }
        }

        const finalData = {
            boardId: registData.boardId,
            mentoringCategoryId: registData.mentoringCategoryId,
            title: registData.title,
            content: registData.content,
            mentoringAddress: !!registData.mentoringAddress
                ? `${registData.mentoringAddress}#${registData.mentoringAddressDetail}`
                : '',
            startDate: registData.startDate.format('YYYY-MM-DD'),
            endDate: registData.endDate.format('YYYY-MM-DD'),
        };

        const formData = new FormData();
        Object.entries(finalData).forEach((entry) =>
            formData.append(entry[0], entry[1])
        );

        if (!!attacheFile) {
            formData.append('file', attacheFile);
        }
        const resp = await registPostMutation.mutateAsync(formData);

        if (resp.status == 200) {
            navigation(
                board.boardName === 'mentoring'
                    ? `/service/${board.boardName}`
                    : `/${board.boardName}`
            );
        } else {
            await Swal.fire({
                titleText: '등록할 수 없습니다.',
                icon: 'error',
                timer: 1000,
                showConfirmButton: false,
            });
        }
    }

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
                                value={categoriesSelectOption?.find(
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
                                    format="YYYY-MM-DD"
                                    value={registData.startDate}
                                    onChange={(e) => {
                                        setRegistData((prev) => ({
                                            ...prev,
                                            startDate: e,
                                        }));
                                    }}
                                />
                                <DatePicker
                                    name="endDate"
                                    id="endDate"
                                    format="YYYY-MM-DD"
                                    value={registData.endDate}
                                    onChange={(e) => {
                                        setRegistData((prev) => ({
                                            ...prev,
                                            endDate: e,
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                        <div css={s.addressBox}>
                            <label htmlFor="address" className="choice">
                                주소
                            </label>
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
                            <label htmlFor="attachedFile" className="choice">
                                첨부파일
                            </label>
                            <input
                                type="text"
                                name="attachedFile"
                                id="attachedFile"
                                onChange={(e) => {
                                    setAttachedFile(e.target.files[0]);
                                }}
                            />
                        </div>
                    </>
                ) : (
                    <input type="file" name="" id="" />
                )}

                <div css={s.btnBox}>
                    <button type="button" onClick={handleRegistPostBtnOnClick}>
                        등록
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            navigation(`/${board.boardName}`);
                        }}
                    >
                        취소
                    </button>
                </div>
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
