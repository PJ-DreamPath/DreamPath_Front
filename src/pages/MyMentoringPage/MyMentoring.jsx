/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetMyMentoringQuery } from '../../queries/userQuery';
import { BiSearch } from 'react-icons/bi';
import Select from 'react-select';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

import { GrView } from 'react-icons/gr';
import { FcLike } from 'react-icons/fc';
import { FaRegTrashCan } from 'react-icons/fa6';
import { useDelPostMutation } from '../../mutations/postMutation';
import Swal from 'sweetalert2';

function MyMentoring(props) {
    const navigate = useNavigate();
    const [posts, getPosts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1');
    const searchText = searchParams.get('searchText') || '';

    const order = searchParams.get('order') || 'desc';
    const orderSelectOptions = [
        { value: 'desc', label: '최신순' },
        { value: 'asc', label: '오래된순' },
    ];

    const searchMyMentoringList = useGetMyMentoringQuery({
        page,
        limitCount: 10,
        order,
        searchText,
    });
    

    const [searchInputValue, setSearchInputValue] = useState('');
    const handleSearchButtonOnClick = () => {
        searchParams.set('page', 1);
        searchParams.set('searchText', searchInputValue);
        setSearchParams(searchParams);
    };

    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        if (!searchMyMentoringList.isLoading) {
            const currentPage = searchMyMentoringList?.data?.data.page || 1;
            const totalPages =
                searchMyMentoringList?.data?.data.totalPages || 1;
            const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1;
            const endIndex =
                startIndex + 4 > totalPages ? totalPages : startIndex + 4;

            let newPageNumbers = [];
            for (let i = startIndex; i <= endIndex; i++) {
                newPageNumbers = [...newPageNumbers, i];
            }
            setPageNumbers(newPageNumbers);
        }
    }, [searchMyMentoringList.data]);

    useEffect(() => {
        searchMyMentoringList.refetch();
    }, [searchParams]);

    const handleSelectOnChange = (option) => {
        searchParams.set('order', option.value);
        setSearchParams(searchParams);
    };

    const handlePageNumbersOnClick = (pageNumber) => {
        searchParams.set('page', pageNumber);
        setSearchParams(searchParams);
    };

    const handleTitleOnClick = (postId) => {
        navigate(`/service/mentoring/${postId}`);
    };

    const delPost = useDelPostMutation();
    async function handleDelBtnOnClick(postId) {

        const result = await Swal.fire({
            title: '게시글 삭제',
            text: '정말로 게시글을 삭제하시겠습니까? 삭제 후에는 복구할 수 없습니다.',
            showConfirmButton: true,
            confirmButtonText: '확인',
            confirmButtonColor: '#1681ff',
            showCancelButton: true,
            cancelButtonText: '취소',
            cancelButtonColor: 'red',
        });

        if (result.isConfirmed) {
            delPost
                .mutateAsync(postId)
                .then(async (response) => {
                    await Swal.fire({
                        title: '삭제 성공',
                        text: '해당 게시글을 삭제되었습니다.',
                        icon: 'success',
                        showConfirmButton: false,
                        iconColor: ' #1683ff',
                        timer: 1000,
                    });
                    searchMyMentoringList.refetch();
                })
                .catch((error) => {
                    Swal.fire({
                        title: '삭제 실패',
                        icon: 'error',
                        iconColor: 'red',
                        showConfirmButton: false,
                        timer: 1000,
                    });
                });
        }

        return;
    }

    return (
        <div css={s.container}>
            <div css={s.titleSelectBar}>
                <h2 css={s.title}>내 멘토링 내역</h2>
                <div css={s.searchTextContainer}>
                    <div css={s.searchInputBox}>
                        <input
                            type="text"
                            value={searchInputValue}
                            onChange={(e) =>
                                setSearchInputValue(e.target.value)
                            }
                        />
                        <button
                            css={s.emptyButton}
                            onClick={handleSearchButtonOnClick}
                        >
                            <BiSearch />
                        </button>
                    </div>
                </div>
                <Select
                    options={orderSelectOptions}
                    styles={{
                        control: (style) => ({
                            ...style,
                            width: '15rem',
                            height: '4rem',
                            minHeight: 'unset',
                            fontSize: '1.3rem',
                            boxSizing: 'border-box',
                        }),
                        dropdownIndicator: (style) => ({
                            ...style,
                            padding: '0.3rem',
                        }),
                    }}
                    value={orderSelectOptions.find(
                        (option) => option.value === order
                    )}
                    onChange={handleSelectOnChange}
                />
            </div>
            <div css={s.tableWrapper}>
                <table css={s.table}>
                    <thead>
                        <tr css={s.tableRowHeader}>
                            <th css={s.tableHeader}>상태</th>
                            <th css={s.tableHeader}>제목</th>
                            <th css={s.tableHeader}>작성일</th>
                            <th css={s.tableHeader}>댓글</th>
                            <th css={s.tableHeader}>좋아요</th>
                            <th css={s.tableHeader}>조회수</th>
                            <th css={s.tableHeader}>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchMyMentoringList?.data?.data.myMentoringSearchList.map(
                            (my, index) => (
                                <tr
                                    key={`myMentoringIndex${index}`}
                                    css={s.tableRow}
                                >
                                    <td css={s.tableCell}>
                                        {my.status === 'recruiting'
                                            ? '모집중'
                                            : '모집마감'}
                                    </td>
                                    <td
                                        css={s.tableCell}
                                        onClick={() => {
                                            handleTitleOnClick(my.postId);
                                        }}
                                    >
                                        {my.title}
                                    </td>
                                    <td css={s.tableCell}>{my.createdAt}</td>
                                    <td css={s.tableCell}>{my.commentCount}</td>
                                    <td css={s.tableCell}>
                                        <span>
                                            <FcLike />
                                        </span>
                                        <span css={s.countBox}>
                                            {my.likeCount}
                                        </span>
                                    </td>
                                    <td css={s.tableCell}>
                                        <span>
                                            <GrView />
                                        </span>
                                        <span css={s.countBox}>
                                            {my.viewCount}
                                        </span>
                                    </td>
                                    <td css={s.tableCell}>
                                        <button
                                            css={s.deleteButton}
                                            onClick={() => {
                                                handleDelBtnOnClick(my.postId)
                                            }}
                                        >
                                            <FaRegTrashCan />
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <div css={s.footer}>
                <div css={s.pageNumbers}>
                    <button
                        disabled={searchMyMentoringList?.data?.data.firstPage}
                        onClick={() => handlePageNumbersOnClick(page - 1)}
                    >
                        <GoChevronLeft />
                    </button>
                    {pageNumbers.map((number) => (
                        <button
                            key={`myMentoring${number}`}
                            css={s.pageNum(page === number)}
                            onClick={() => handlePageNumbersOnClick(number)}
                        >
                            <span>{number}</span>
                        </button>
                    ))}
                    <button
                        disabled={searchMyMentoringList?.data?.data.lastPage}
                        onClick={() => handlePageNumbersOnClick(page + 1)}
                    >
                        <GoChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyMentoring;
