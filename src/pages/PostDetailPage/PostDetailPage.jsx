/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetBoards } from '../../queries/boardQuery';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import parse from 'html-react-parser';
import { useGetMyLike, useGetPostDetail } from '../../queries/postQuery';
import moment from 'moment/moment';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
    useDelPostMutation,
    usePostLikeCancelMutation,
    usePostLikeMutation,
} from '../../mutations/postMutation';
import {
    useMentoringApplyMutation,
    useMentoringStatusUpdateMutation,
} from '../../mutations/mentoringMutation';

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
        if (boardList?.data?.data) {
            let newArray = boardList.data.data.find(
                (board) => board.boardName === pathNm
            );
            setBoard(newArray || {});
        }
    }, [boardList.data]);

    // user data
    const queryClient = useQueryClient();
    const loginUserData = queryClient.getQueryData(['userMeQuery']);

    // 상세 조회
    const postDetail = useGetPostDetail(fullPath.postId);
    const [post, setPost] = useState({});

    useEffect(() => {
        if (postDetail && postDetail.data && postDetail.data.data) {
            setPost(postDetail.data.data);
        }
    }, [postDetail.data]);

    // 카카오맵 주소 변환
    const [mapCenter, setMapCenter] = useState({
        lat: 33.5563,
        lng: 126.79581,
    });
    useEffect(() => {
        if (window.kakao && window.kakao.maps && post.mentoringAddress) {
            const geocoder = new window.kakao.maps.services.Geocoder();

            geocoder.addressSearch(post.mentoringAddress, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    setMapCenter({
                        lat: parseFloat(result[0].y),
                        lng: parseFloat(result[0].x),
                    });
                }
            });
        }
    }, [post.mentoringAddress]);

    // 모집 상태 변경
    const update = useMentoringStatusUpdateMutation();

    const [isRecruiting, setIsRecruiting] = useState(
        post.status === 'recruiting'
    );
    useEffect(() => {
        setIsRecruiting(post.status === 'recruiting');
    }, [post.status]);

    function handleStatusUpdate() {
        if (
            loginUserData.data.userId === post.userId &&
            moment(post.startDate).format('YYYY-MM-DD') <
                moment().format('YYYY-MM-DD') &&
            moment(post.endDate).format('YYYY-MM-DD') >
                moment().format('YYYY-MM-DD')
        ) {
            setIsRecruiting(!isRecruiting);
            update.mutateAsync(post.postId).then((result) => {
                setIsRecruiting(result.data === 'recruiting');
            });
        }
    }

    // 좋아요 클릭
    const isMyLike = useGetMyLike(post.postId);
    const clickLike = usePostLikeMutation();
    const cancleLike = usePostLikeCancelMutation();

    function handlelikeBtnOnClick() {
        if (isMyLike?.data?.data === undefined || isMyLike?.data?.data === '') {
            clickLike.mutateAsync(post.postId).then((resp) => {
                if (resp.status === 200) {
                    isMyLike.refetch();
                    postDetail.refetch();
                }
            });
        } else {
            cancleLike.mutateAsync(post.postId).then((resp) => {
                if (resp.status === 200) {
                    isMyLike.refetch();
                    postDetail.refetch();
                }
            });
        }
    }

    // 신청 클릭
    const mentoringApply = useMentoringApplyMutation();

    const handleOnApplyButtonOnClick = () => {
        mentoringApply
            .mutateAsync({
                postId: post.postId,
                email: post.user.email,
            })
            .then((result) => {
                Swal.fire(result.data);
            });
    };

    // 삭제 클릭
    const delPost = useDelPostMutation();
    async function handleDelBtnOnClick() {
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
                .mutateAsync(post.postId)
                .then(async (response) => {
                    await Swal.fire({
                        title: '삭제 성공',
                        text: '해당 게시글을 삭제되었습니다.',
                        icon: 'success',
                        showConfirmButton: false,
                        iconColor: ' #1683ff',
                        timer: 1000,
                    });

                    navigate(
                        pathNm === 'mentoring'
                            ? `/service/mentoring`
                            : `/${pathNm}`
                    );
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

    return !postDetail.isLoading ? (
        <>
            <div css={s.titleBox}>
                <div css={s.left}>
                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                pathNm === 'mentoring'
                                    ? `/service/mentoring`
                                    : `/${pathNm}`
                            )
                        }
                        css={s.breadCrumb}
                    >
                        {board?.boardNameKor}
                        <MdOutlineKeyboardArrowRight />
                    </button>

                    <div css={s.title}>
                        <h2>{post.title}</h2>
                        {post.starPoint > 0 && (
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
                        )}
                    </div>
                </div>

                <div css={s.right}>
                    <p>{post.user?.nickname}</p>
                    <p>{moment(post.createdAt).format('YYY-MM-DD')}</p>
                    <p>조회수 {post.viewCount}</p>

                    {pathNm === 'mentoring' && (
                        <div css={s.toggleWrap}>
                            <p>모집중</p>
                            <button
                                type="button"
                                onClick={handleStatusUpdate}
                                css={s.toggleBox(
                                    isRecruiting,
                                    loginUserData.data.userId === post.userId &&
                                        moment(post.startDate).format(
                                            'YYYY-MM-DD'
                                        ) < moment().format('YYYY-MM-DD') &&
                                        moment(post.endDate).format(
                                            'YYYY-MM-DD'
                                        ) > moment().format('YYYY-MM-DD')
                                )}
                            >
                                <span></span>
                            </button>
                            <p>모집마감</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 상세 정보 박스 */}
            {board.boardName === 'mentoring' ? (
                <div css={s.detailInfoBox}>
                    <div css={s.row}>
                        <p>카테고리</p>
                        <span>{post.categoryName}</span>
                    </div>
                    <div css={s.row}>
                        <p>멘토링 일자</p>
                        <span>{`${post.startDate} ~ ${post.endDate}`}</span>
                    </div>
                    <div css={s.row}>
                        <p>첨부파일</p>
                        <span>{post.attachedFiles}</span>
                    </div>
                </div>
            ) : (
                <div css={s.row}>파일</div>
            )}

            <div css={s.contentBox}>{parse(String(post.content || ''))}</div>

            {loginUserData.data.userId === post.userId ||
            post.status !== 'recruiting' ? (
                <></>
            ) : (
                <button
                    type="button"
                    css={s.likeBtn}
                    onClick={handlelikeBtnOnClick}
                >
                    {isMyLike?.data?.data === undefined ||
                    isMyLike?.data?.data === '' ? (
                        <FaRegHeart />
                    ) : (
                        <FaHeart />
                    )}
                    {post.likeCount}
                </button>
            )}

            {/* 주소 박스 */}
            {post.mentoringAddress && (
                <div css={s.mapBox}>
                    <p>
                        만남의 장소
                        <span>{post.mentoringAddress.split('#')[0]}</span>
                        <span>{post.mentoringAddress.split('#')[1]}</span>
                    </p>
                    <Map
                        center={mapCenter}
                        style={{ width: '100%', height: '360px' }}
                        level={3}
                    >
                        <CustomOverlayMap position={mapCenter}>
                            <div css={s.here}>
                                <p>
                                    <span>HERE</span>
                                    <span>여기서 만나요!</span>
                                </p>
                            </div>
                        </CustomOverlayMap>
                    </Map>
                </div>
            )}

            {/* 버튼 박스 */}
            <div css={s.btnBox}>
                {loginUserData.data.userId === post.userId ? (
                    <>
                        {post.status === 'recruiting' ? (
                            <button
                                type="button"
                                className="update"
                                onClick={async () => {
                                    await Swal.fire({
                                        text: '수정 페이지로 이동합니다.',
                                        showConfirmButton: false,
                                        timer: 1000,
                                    });
                                    navigate(
                                        pathNm === 'mentoring'
                                            ? `/service/mentoring/update`
                                            : `/${pathNm}/update`
                                    );
                                }}
                            >
                                수정
                            </button>
                        ) : (
                            <></>
                        )}

                        <button
                            type="button"
                            className="del"
                            onClick={handleDelBtnOnClick}
                        >
                            삭제
                        </button>
                    </>
                ) : post.status === 'recruiting' ? (
                    <button
                        type="button"
                        className="regist"
                        onClick={handleOnApplyButtonOnClick}
                    >
                        신청하기
                    </button>
                ) : (
                    <></>
                )}
                <button
                    type="button"
                    className="goList"
                    onClick={() => {
                        navigate(
                            pathNm === 'mentoring'
                                ? `/service/mentoring`
                                : `/${pathNm}`
                        );
                    }}
                >
                    목록
                </button>
            </div>

            {/* 댓글 박스 */}
            {pathNm !== 'notice' && (
                <div css={s.commentBox}>여기에 댓글 코드 작성해주세요</div>
            )}
        </>
    ) : (
        <></>
    );
}
