/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useRef, useState } from 'react';
import PostCard from '../../components/common/PostCard/PostCard';
import Select from 'react-select';
import { useGetPostsInfinityScroll } from '../../queries/postQuery';
import { IoSearch } from 'react-icons/io5';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export default function MentoringPage({}) {
    const navigation = useNavigate();

    // 셀렉트 박스 옵션
    const orderSelectOptions = [
        { value: 'desc', label: '최신순' },
        { value: 'asc', label: '오래된순' },
        { value: 'recruiting', label: '모집중' },
        { value: 'closedRecruitment', label: '모집마감' },
        { value: 'startDesc', label: '평점높은순' },
        { value: 'commentDesc', label: '후기많은순' },
        { value: 'likeDesc', label: '좋아요많은순' },
    ];

    // 검색 조건
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState({
        order: searchParams.get('order') || 'desc',
        searchTxt: searchParams.get('searchTxt') || '',
    });
    const [searchTxtValue, setSearchTxtValue] = useState(search.searchTxt);

    function handleSearchOnClick() {
        searchParams.set('searchTxt', searchTxtValue);
        setSearchParams(searchParams);
    }
    function handleOrderOnClick(value) {
        searchParams.set('order', value);
        setSearchParams(searchParams);
    }

    useEffect(() => {
        setSearch({
            order: searchParams.get('order') || 'desc',
            searchTxt: searchParams.get('searchTxt') || '',
        });
    }, [searchParams]);

    // 리스트 데이터
    const getPostList = useGetPostsInfinityScroll('mentoring', search);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        console.log('postList', postList);
    }, [postList]);

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
                        value={orderSelectOptions.find(
                            (option) => option.value === search.order
                        )}
                        onChange={(option) => {
                            handleOrderOnClick(option.value);
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => {
                            navigation('/service/mentoring/regist');
                        }}
                    >
                        글쓰기
                    </button>
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
                                starPoint={post.user.starPoint}
                                createdAt={post.createdAt}
                                onClick={() => {
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
