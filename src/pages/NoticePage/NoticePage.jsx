import React, { useEffect, useState } from 'react';
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { useGetPosts } from '../../queries/postQuery';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useGetBoards } from '../../queries/boardQuery';
import { IoSearch } from 'react-icons/io5';
import Select from 'react-select';
import { useUserMeQuery } from '../../queries/userQuery';

function NoticePage({ }) {

    const navigation = useNavigate();

    const pathNm = useParams();
    
    const orderSelectOptions = [
        { value: 'desc', label: '최신순' },
        { value: 'asc', label: '오래된순' },
        { value: 'likeDesc', label: '좋아요많은순' },
    ];
    
    const [searchParams, setSearchParams] = useSearchParams();
    
    const page = parseInt(searchParams.get("page") || "1");
    
    const [search, setSearch] = useState({
        page: searchParams.get('page') || '1',
        limitCount: 10,
        order: searchParams.get('order') || 'desc',
        searchText: searchParams.get('searchText') || '',
    });
    
    const [searchTextValue, setSearchTextValue] = useState(search.searchText);
    
    const [pageNumbers, setPageNumbers] = useState([]);

    function handleSearchOnClick() {
        searchParams.set('searchTxt', searchTextValue);
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

    const boardList = useGetBoards();

    const [board, setBoard] = useState({});
    

    useEffect(() => {
        if (boardList?.data?.data) {
            let newArray = boardList.data.data.find(
                (board) => board.boardName === 'notice'
            );
            setBoard(newArray || {});
        }
    }, [boardList.data]);
    
    const noticePostList = useGetPosts(board.boardId, search);

    useEffect(() => {
        if (!noticePostList?.isLoading) {
            const currentPage = noticePostList?.data?.data.page || 1;
            const totalPages = noticePostList?.data?.data.totalPages || 1;
            const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1;
            const endIndex =
                startIndex + 4 > totalPages ? totalPages : startIndex + 4;

            let newPageNumbers = [];
            for (let i = startIndex; i <= endIndex; i++) {
                newPageNumbers = [...newPageNumbers, i];
            }
            
            setPageNumbers(newPageNumbers);
        }
    }, [noticePostList?.data]);

    useEffect(() => {
        noticePostList.refetch();
    }, []);

    const { data } = useUserMeQuery();

    const roleName = data?.data?.roleName;

    return (
        <div css={s.container}>
            <h2 css={s.title}>공지사항</h2>
            <div css={s.searchWrap}>
                <div css={s.searchBox}>
                    <input 
                        type="text"
                        name="search"
                        id="search"
                        placeholder='검색어 입력'
                        value={searchTextValue}
                        onChange={(e) => setSearchTextValue(e.target.value)}
                        onKeyUp={(e) => {
                            if(e.key === 'Enter') {
                                handleSearchOnClick();
                            }
                        }} 
                    />
                    <IoSearch onClick={handleSearchOnClick} />
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
                {
                    roleName === "관리자" && (
                        <button 
                            type="button"
                            onClick={() => {
                                navigation('/service/notice/regist');
                            }}
                        >
                            글쓰기
                        </button>
                )}
            </div>
            <div css={s.tableWrapper}>
                <table css={s.table}>
                    <thead>
                        <tr css={s.tableRowHeader}>
                            <th css={s.tableHeader}>제목</th>
                            <th css={s.tableHeader}>작성자</th>
                            <th css={s.tableHeader}>작성일</th>
                            <th css={s.tableHeader}>댓글</th>
                            <th css={s.tableHeader}>좋아요</th>
                            <th css={s.tableHeader}>조회수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticePostList && !noticePostList.isLoading ? (
                            noticePostList?.data?.data?.postList?.map(
                                (post, index) => (
                                    <tr key={`noticePost${index}`} css={s.tableRow}>
                                        <td 
                                            css={s.tableCell}
                                            className="titleName"
                                            onClick={() => {
                                                navigation(
                                                    `/notice/${post.postId}`
                                                )
                                            }}
                                        >
                                            {post.title}
                                        </td>
                                        <td css={s.tableCell} className="name">
                                            {post.user.nickname}
                                        </td>
                                        <td css={s.tableCell}>{new Date(post.createdAt).toLocaleDateString()}</td>
                                        <td css={s.tableCell}>{post.commentCount}</td>
                                        <td css={s.tableCell}>{post.likeCount}</td>
                                        <td css={s.tableCell}>{post.viewCount}</td>
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
                        disabled={noticePostList?.data?.data.firstPage}
                        onClick={() => handlePageNumbersOnClick(page - 1)}
                    >
                        <GoChevronLeft />
                    </button>
                    {pageNumbers.map((number) => (
                        <button
                            key={`noticePostList${number}`}
                            css={s.pageNum(page === number)}
                            onClick={() => handlePageNumbersOnClick(number)}
                        >
                            <span>{number}</span>
                        </button>
                    ))}
                    <button
                        disabled={noticePostList?.data?.data.lastPage}
                        onClick={() => handlePageNumbersOnClick(page + 1)}
                    >
                        <GoChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );

}

export default NoticePage;