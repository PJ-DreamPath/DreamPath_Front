/**@jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import * as s from './style';
import React, { useEffect, useState } from 'react';
import { useGetPosts } from '../../../queries/postQuery';
import moment from 'moment';
import { useQueryClient } from '@tanstack/react-query';

function BottomContainer(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const loginUser = queryClient.getQueryData(["userMeQuery"]);

    const handleNoticeMoreOnClick = () => {
        navigate("/notice");
    }

    const handleCommunityMoreOnClick = () => {
        navigate("/communityBoard");
    }
    
    const [search, setSearch] = useState({
            page: 1,
            limitCount: 5,
            order: 'desc',
            searchTxt: '',
        });

    const noticeList = useGetPosts(3, search);

    const communityList = useGetPosts(2, search);


    useEffect(() => {
            if (noticeList && noticeList.data && noticeList.data.data) {
                console.log('noticeList', noticeList);
            }
        }, [noticeList?.data]);

        useEffect(() => {
            if (communityList && communityList.data && communityList.data.data) {
                console.log('communityList', communityList);
            }
        }, [communityList?.data]);


    return (
        <div css={s.boardContainer}>
            <div css={s.board}>
                <div css={s.boardHeader}>
                    <h1>공지사항</h1>
                    <span onClick={handleNoticeMoreOnClick}>더보기</span>
                </div>
                {
                    noticeList?.data?.data.postList.map(post => 
                    <div css={s.row} onClick={() => {
                        if(!loginUser){
                            alert("로그인 후 이용해주세요");
                            navigate("/home");
                            return;
                        }
                        navigate(
                            `/notice/${post.postId}`
                        );
                    }}>
                        <div >{post.title}</div>
                        <div>{post.user.nickname}</div>
                        <div>{moment(post.createdAt).format(`yyyy-MM-DD`)}</div>
                    </div>
                )
                }
            </div>
            <div css={s.board}>
                <div css={s.boardHeader}>
                    <h1>자유게시판</h1>
                    <span onClick={handleCommunityMoreOnClick}>더보기</span>
                </div>
                {
                    communityList?.data?.data.postList.map(post => 
                    <div css={s.row} onClick={() => {
                        if(!loginUser){
                            alert("로그인 후 이용해주세요");
                            navigate("/home");
                            return;
                        }
                        navigate(
                            `/communityBoard/${post.postId}`
                        );
                    }}>
                        <div >{post.title}</div>
                        <div>{post.user.nickname}</div>
                        <div>{moment(post.createdAt).format(`yyyy-MM-DD`)}</div>
                    </div>
                )
                }
            </div>
        </div>
    );
}

export default BottomContainer;