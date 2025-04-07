/** @jsxImportSource @emotion/react */
import * as s from './style';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Select from 'react-select';
import { IoSearch } from 'react-icons/io5';
import { useGetPosts } from '../../queries/postQuery';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useGetBoards } from '../../queries/boardQuery';
import { FcLike } from 'react-icons/fc';
import { GrView } from 'react-icons/gr';
import { FaRegCommentDots } from 'react-icons/fa';
import moment from 'moment/moment';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdatePostViewCountMutation } from '../../mutations/postMutation';

export default function CommunityBoardPage({}) {
    const navigation = useNavigate();
    const queryClient = useQueryClient();
    const loginUser = queryClient.getQueryData(['userMeQuery']);
    // 셀렉트 박스 옵션
    const orderSelectOptions = [
        { value: 'desc', label: '최신순' },
        { value: 'asc', label: '오래된순' },
        { value: 'likeDesc', label: '좋아요많은순' },
    ];

    // 검색 조건
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState({
        page: searchParams.get('page') || '1',
        limitCount: 10,
        order: searchParams.get('order') || 'desc',
        searchTxt: searchParams.get('searchTxt') || '',
    });

    const [searchTxtValue, setSearchTxtValue] = useState(search.searchTxt);
    const [pageNumbers, setPageNumbers] = useState([]);

    function handleSearchOnClick() {
        searchParams.set('searchTxt', searchTxtValue);
        setSearchParams(searchParams);
    }
    function handleOrderOnClick(value) {
        searchParams.set('order', value);
        setSearchParams(searchParams);
    }
    const handlePageNumbersOnClick = (pageNumber) => {
        searchParams.set('page', pageNumber);
        setSearchParams(searchParams);
    };

    useEffect(() => {
        setSearch({
            page: searchParams.get('page') || '1',
            limitCount: 10,
            order: searchParams.get('order') || 'desc',
            searchTxt: searchParams.get('searchTxt') || '',
        });
    }, [searchParams]);

    // board 리스트
    const boardList = useGetBoards();
    const [board, setBoard] = useState({
        boardId: 0,
    });

    useEffect(() => {
        if (boardList?.data?.data) {
            let newArray = boardList.data.data.find(
                (board) => board.boardName === 'communityboard'
            );
            setBoard(newArray || {});
        }
    }, [boardList.data]);

    // listdata
    const postList = useGetPosts(2, search);

    useEffect(() => {
        if (postList && postList.data && postList.data.data) {

            if (!postList?.isLoading) {
                const currentPage = postList.data.data.page || 1;
                const totalPages = postList.data.data.totalPages || 1;
                const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1;
                const endIndex =
                    startIndex + 4 > totalPages ? totalPages : startIndex + 4;

                let newPageNumbers = [];
                for (let i = startIndex; i <= endIndex; i++) {
                    newPageNumbers = [...newPageNumbers, i];
                }

                setPageNumbers(newPageNumbers);
            }
        }
    }, [postList?.data]);

    useEffect(() => {
        postList.refetch();
    }, []);

        const updateViewCount = useUpdatePostViewCountMutation();
        const handlePostDetailOnClick = async (e) => {
            await updateViewCount.mutateAsync(e);
        }
    

    return (
        <>
            <div css={s.titleBox}>
                <h3>자유게시판</h3>
                <div css={s.searchWrap}>
                    <div css={s.searchBox}>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="검색어 입력"
                            value={searchTxtValue}
                            onChange={(e) => setSearchTxtValue(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearchOnClick();
                                }
                            }}
                        />
                        <IoSearch onClick={handleSearchOnClick} style={{cursor: 'pointer'}} />
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
                        value={
                            orderSelectOptions.find(
                                (option) => option.value === search.order
                            ) || ''
                        }
                        onChange={(option) => {
                            handleOrderOnClick(option.value);
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => {
                            if(!loginUser) {
                                alert("로그인 후 이용하세요");
                                return;
                            }
                            navigation('/service/communityboard/regist');
                        }}
                    >
                        글쓰기
                    </button>
                </div>
            </div>

            <div css={s.tableWrapper}>
                <table css={s.table}>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>댓글</th>
                            <th>좋아요</th>
                            <th>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postList && !postList.isLoading ? (
                            postList.data?.data.postList.map((board, idx) => (
                                <tr key={`communityboard_${idx}`}>
                                    <td
                                        onClick={async () => {
                                            
                                            if (!loginUser) {
                                                alert('로그인 후 이용해주세요');
                                                return;
                                            }
                                            await handlePostDetailOnClick(board.postId);
                                            navigation(
                                                `/communityboard/${board.postId}`
                                            );
                                        }}
                                    >
                                        <p css={s.tdTitle}>{board.title}</p>
                                    </td>
                                    <td>
                                        <p css={s.writer}>
                                            {board.user.nickname}
                                        </p>
                                    </td>
                                    <td>
                                        {moment(board.createdAt).format(
                                            'YYYY-MM-DD'
                                        )}
                                    </td>
                                    <td>
                                        <FaRegCommentDots />
                                        <span>{board.commentCount}</span>
                                    </td>
                                    <td>
                                        <FcLike />
                                        <span>{board.likeCount}</span>
                                    </td>
                                    <td>
                                        <GrView />
                                        <span>{board.viewCount}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <></>
                        )}
                    </tbody>
                </table>
            </div>

            <div css={s.footer}>
                <div css={s.pageNumbers}>
                    <button
                        disabled={postList?.data?.data.firstPage}
                        onClick={() =>
                            handlePageNumbersOnClick(
                                postList.data.data.page - 1
                            )
                        }
                    >
                        <GoChevronLeft />
                    </button>
                    {pageNumbers.map((number) => (
                        <button
                            key={`communityListPage${number}`}
                            css={s.pageNum(
                                postList?.data?.data.page === number
                            )}
                            onClick={() => handlePageNumbersOnClick(number)}
                        >
                            <span>{number}</span>
                        </button>
                    ))}
                    <button
                        disabled={postList?.data?.data.lastPage}
                        onClick={() =>
                            handlePageNumbersOnClick(
                                postList.data.data.page + 1
                            )
                        }
                    >
                        <GoChevronRight />
                    </button>
                </div>
            </div>
        </>
    );
}
