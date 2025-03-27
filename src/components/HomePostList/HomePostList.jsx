/**@jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import { useGetPosts } from '../../queries/postQuery';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import PostCard from '../common/PostCard/PostCard';

function HomePostList(props) {
    const navigation = useNavigate();

    const [search, setSearch] = useState({
                page: 1,
                limitCount: 4,
                order: 'startDesc',
                searchTxt: '',
            });

    const mentoringPostList = useGetPosts(1, search);

    useEffect(() => {
        if (mentoringPostList && mentoringPostList.data && mentoringPostList.data.data) {
        console.log('mentoringPostList', mentoringPostList);
        }
    }, [mentoringPostList?.data])
    return (
        <div css={s.postListContainer}>
            {
                mentoringPostList?.data?.data.postList.map((post) => 
                    <PostCard
                        key={`homePost_${post.postId}`}
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
                )
            }
        </div>
    );
}

export default HomePostList;