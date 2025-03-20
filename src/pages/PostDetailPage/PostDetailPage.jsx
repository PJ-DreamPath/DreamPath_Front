/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetBoards } from '../../queries/boardQuery';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaHeart, FaStar } from 'react-icons/fa';
import parse from 'html-react-parser';
import { useGetPostDetail } from '../../queries/postQuery';
import moment from 'moment/moment';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function PostDetailPage({}) {
    const navigate = useNavigate();

    // notice인지 mentring인지 communityBoard인지 구분하기 위함!
    const fullPath = useParams();
    const [pathNm, setPathNm] = useState(fullPath['*'].split('/')[0]);

    useEffect(() => {
        setPathNm(fullPath['*'].split('/')[0]);
    }, [fullPath]);

    // breadCrumb
    const boardList = useGetBoards();
    const [board, setBoard] = useState({});

    useEffect(() => {
        if (boardList && boardList.data && boardList.data.data) {
            let newArray = boardList.data.data.filter(
                (board) => board.boardName == pathNm
            )[0];
            setBoard(newArray);
        }
    }, [boardList.data]);

    // 상세 조회
    const postDeatil = useGetPostDetail(fullPath.postId);
    const [post, setPost] = useState({});

    useEffect(() => {
        if (postDeatil && postDeatil.data && postDeatil.data.data) {
            setPost(postDeatil.data.data);
        }
    }, [postDeatil.data]);

    // 카카오맵

    useEffect(() => {
        console.log(post);
    }, [post]);

    return (
        <>
            <div css={s.titleBox}>
                <div css={s.left}>
                    <button
                        type="button"
                        onClick={() => {
                            navigate(
                                pathNm === 'mentoring'
                                    ? `/service/mentoring`
                                    : `/${pathNm}`
                            );
                        }}
                        css={s.breadCrumb}
                    >
                        {board.boardNameKor}
                        <MdOutlineKeyboardArrowRight />
                    </button>

                    <div css={s.title}>
                        <h2>{post.title}</h2>
                        {post.starPoint > 0 ? (
                            <div css={s.starBox}>
                                {Array.from(
                                    { length: post.starPoint },
                                    (_, index) => (
                                        <FaStar
                                            key={`detailStarPont_${index}`}
                                        />
                                    )
                                )}
                                <p>{post.starPoint}</p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>

                <div css={s.right}>
                    <p>{post.user?.nickname}</p>
                    <p>{moment(post.createdAt).format('YYY-MM-DD')}</p>
                    <p>조회수 {post.viewCount}</p>

                    {pathNm === 'mentoring' ? (
                        <div css={s.toggleWrap}>
                            <p>모집중</p>
                            <div
                                css={s.toggleBox(
                                    post.status === 'recruiting' ? true : false
                                )}
                            >
                                <span></span>
                            </div>
                            <p>모집마감</p>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>

            <div css={s.contentBox}>{parse(String(post.content))}</div>

            <button type="button" css={s.likeBtn}>
                <FaHeart /> {post.likeCount}
            </button>

            {/* 주소 박스 */}
            {post.mentoringAddress ? (
                <div css={s.mapBox}>
                    <Map
                        center={{ lat: 33.5563, lng: 126.79581 }}
                        style={{ width: '100%', height: '360px' }}
                    >
                        <MapMarker
                            position={{ lat: 33.55635, lng: 126.795841 }}
                        >
                            <div style={{ color: '#000' }}>Hello World!</div>
                        </MapMarker>
                    </Map>
                </div>
            ) : (
                <></>
            )}

            {/* 댓글 박스 */}
            {pathNm !== 'notice' ? (
                <>
                    <div css={s.commentBox}>여기에 댓글 코드 작성해주세요</div>
                </>
            ) : (
                <></>
            )}
        </>
    );
}
