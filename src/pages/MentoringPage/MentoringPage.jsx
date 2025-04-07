/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useRef, useState } from 'react';
import PostCard from '../../components/common/PostCard/PostCard';
import Select from 'react-select';
import { useGetPostsInfinityScroll } from '../../queries/postQuery';
import { IoSearch } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetBoards } from '../../queries/boardQuery';
import { useRecoilState } from 'recoil';
import { sideMenuBoxMentoringState } from '../../atoms/sideMenuBox';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useUpdatePostViewCountMutation } from '../../mutations/postMutation';

export default function MentoringPage({}) {
    const navigation = useNavigate();
    // user data
    const queryClient = useQueryClient();
    const loginUserData = queryClient.getQueryData(['userMeQuery']);

   

    // 셀렉트 박스 옵션
    const orderSelectOptions = [
        { value: 'desc', label: '최신순' },
        { value: 'asc', label: '오래된순' },
        { value: 'starDesc', label: '평점높은순' },
        // { value: 'commentDesc', label: '후기많은순' },
        { value: 'likeDesc', label: '좋아요많은순' },

        // { value: 'back', label: '백엔드' },
        // { value: 'front', label: '프론트엔드' },
        // { value: 'security', label: '정보보안' },
        // { value: 'full', label: '풀스택' },
    ];

    const statusSelectOptions = [
        { value: '', label: '전체' },
        { value: 'recruiting', label: '모집중' },
        { value: 'closedRecruitment', label: '모집마감' },
    ];

    // 검색 조건
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useRecoilState(sideMenuBoxMentoringState);

    const [searchTxtValue, setSearchTxtValue] = useState(search.searchTxt);

    function handleSearchOnClick() {
        searchParams.set('searchTxt', searchTxtValue);
        setSearchParams(searchParams);
    }
    function handleOrderOnClick(value) {
        searchParams.set('order', value);
        setSearchParams(searchParams);
    }

    function handleStatusOnClick(value) {
        searchParams.set('status', value);
        setSearchParams(searchParams);
    }

    useEffect(() => {
        setSearch({
            order: searchParams.get('order') || 'desc',
            status: searchParams.get('status') || '',
            category: searchParams.get('category') || '',
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
                (board) => board.boardName === 'mentoring'
            );
            setBoard(newArray || {});
        }
    }, [boardList.data]);

    // 리스트 데이터
    const getPostList = useGetPostsInfinityScroll(board.boardId, search);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        if (
            getPostList.data &&
            getPostList.data.pages &&
            getPostList.data.pages.length > 0
        ) {
            const newArray = [];

            getPostList.data.pages.map((list) =>
                list.data.postList.map((post) => {
                    newArray.push(post);
                })
            );


            setPostList(newArray);
        }
    }, [getPostList.data]);

    // observer
    const loadMoreRef = useRef(null);
    useEffect(() => {
        if (postList.length > 0) {
            const observerCallback = (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    getPostList.fetchNextPage();
                }
            };
            const observerOption = {
                threshold: 1.0,
            };
            const observer = new IntersectionObserver(
                observerCallback,
                observerOption
            );

            observer.observe(loadMoreRef.current);
        }
    }, [postList]);

    useEffect(() => {
        getPostList.refetch();
    }, []);

    const updateViewCount = useUpdatePostViewCountMutation();
    const handlePostDetailOnClick = async (e) => {
        await updateViewCount.mutateAsync(e);
    }

    return (
        <>
            <div css={s.titleBox}>
                <h3>멘토링</h3>
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
                        options={statusSelectOptions}
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
                            statusSelectOptions.find(
                                (option) => option.value === search.status
                            ) || ''
                        }
                        onChange={(option) => {
                            handleStatusOnClick(option.value);
                        }}
                    />
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
                            ) || 'desc'
                        }
                        onChange={(option) => {
                            handleOrderOnClick(option.value);
                        }}
                    />

                    {loginUserData?.data?.roleName === 'ROLE_MENTO' ? (
                        <button
                            type="button"
                            onClick={() => {
                                if (loginUserData.data.remaining === 0) {
                                    Swal.fire(
                                        '남은 등록 가능 횟수가 없습니다.'
                                    );
                                    return;
                                }
                                navigation('/service/mentoring/regist');
                            }}
                        >
                            글쓰기
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <div css={s.listBox}>
                {postList.length > 0 ? (
                    postList.map((post, idx) => {
                        return (
                            <PostCard
                                key={`post_${idx}`}
                                ref={
                                    idx === postList.length - 1
                                        ? loadMoreRef
                                        : null
                                }
                                status={post.status}
                                likeCount={post.likeCount}
                                title={post.title}
                                content={post.content}
                                nickname={post.user.nickname}
                                starPoint={post.starPoint}
                                createdAt={post.createdAt}
                                category={post.categoryNameKor}
                                onClick={ async () => {
                                    await handlePostDetailOnClick(post.postId);
                                    navigation(
                                        `/service/mentoring/${post.postId}`
                                    );
                                }}
                            />
                        );
                    })
                ) : (
                    <p css={s.noPost}>등록된 게시글이 없습니다.</p>
                )}
            </div>
        </>
    );
}
