/**@jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { useGetPosts } from '../../queries/postQuery';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import PostCard from '../common/PostCard/PostCard';
import HomePostCard from './HomePostCard';

function HomePostList(props) {
    const navigation = useNavigate();

    const [search, setSearch] = useState({
        page: 1,
        limitCount: 4,
        order: 'starDesc',
        searchTxt: '',
        status: 'recruiting',
    });

    const mentoringPostList = useGetPosts(1, search);

    useEffect(() => {
        mentoringPostList.refetch();
    }, []);

    return (
        <div>
            <h3 css={s.popular}>인기 멘토링</h3>
            <div css={s.postListContainer}>
                {mentoringPostList?.data?.data.postList.map((post) => (
                    <HomePostCard
                        key={`mentoring_main_${post.postId}`}
                        status={post.status}
                        likeCount={post.likeCount}
                        title={post.title}
                        content={post.content}
                        nickname={post.user.nickname}
                        starPoint={post.starPoint}
                        createdAt={post.createdAt}
                        onClick={() => {
                            navigation(`/service/mentoring/${post.postId}`);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

export default HomePostList;
