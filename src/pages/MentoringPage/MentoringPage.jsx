/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useRef, useState } from 'react';
import PostCard from '../../components/common/PostCard/PostCard';
import Select from 'react-select';
import { useGetPosts } from '../../queries/postQuery';

export default function MentoringPage({}) {
    const orderSelectOptions = [
        { value: 'desc', label: '최신순' },
        { value: 'asc', label: '오래된순' },
        { value: 'recruiting', label: '모집중' },
        { value: 'closedRecruitment', label: '모집마감' },
        { value: 'startDesc', label: '평점높은순' },
        { value: 'commentDesc', label: '후기많은순' },
        { value: 'likeDesc', label: '좋아요많은순' },
    ];

    const { params, setParams } = useState({
        page: 1,
        limitCount: 16,
        order: 'desc',
        searchTxt: '',
    });

    const getPostList = useGetPosts('mentoring', params);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        if (
            getPostList.data &&
            getPostList.data.data &&
            getPostList.data.data.postList
        ) {
            setPostList(getPostList.data.data.postList);
        }
    }, [getPostList.data]);


    // observer
    const loadMoreRef = useRef(null);
    useEffect(() => {
        const observerCallback = (entries) => {
            console.log(entries);
            const [entry] = entries;
            if (entry.isIntersecting) {
                console.log('다음페이지 불러오기');
                getCategoryBaordList.fetchNextPage();
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
    }, []);

    return (
        <>
            <div css={s.titleBox}>
                <h3>멘토링</h3>
                <div css={s.searchWrap}>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="검색어 입력"
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
                        value={''}
                        onChange={(option) => {}}
                    />
                </div>
            </div>

            <div css={s.listBox}>
                {postList.map((post, idx) => {
                    return (
                        <PostCard
                            key={`post_${idx}`}
                            ref={
                                idx === postList.length - 1 ? loadMoreRef : null
                            }
                            status={post.status}
                            viewCount={post.viewCount}
                            title={post.title}
                            content={post.content}
                            nickname={post.user.nickname}
                            starPoint={post.user.starPoint}
                            createdAt={post.createdAt}
                        />
                    );
                })}
            </div>
        </>
    );
}
