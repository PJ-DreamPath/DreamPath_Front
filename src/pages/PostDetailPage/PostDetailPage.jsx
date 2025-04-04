/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useRef, useState } from 'react';
import {
    Link,
    useNavigate,
    useParams,
    useSearchParams,
} from 'react-router-dom';
import { useGetBoards } from '../../queries/boardQuery';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import parse from 'html-react-parser';
import { useGetMyLike, useGetPostDetail } from '../../queries/postQuery';
import moment, { now } from 'moment/moment';
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
import {
    useDeleteCommentMutation,
    useSaveCommentMutation,
    useUpdateCommentMutation,
} from '../../mutations/mentoringCommentMutation';
import { usegGetCommentsQuery } from '../../queries/commentQuery';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useGetMentoringApplyHistoryQuery } from '../../queries/userQuery';
import { api } from '../../configs/axiosConfig';

export default function PostDetailPage({}) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get('page') || '1');

    const deleteCommentMutation = useDeleteCommentMutation();
    const saveCommentMutation = useSaveCommentMutation();

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
    const apply = useGetMentoringApplyHistoryQuery({
        page: 1,
        limitCount: 10,
        order: 'desc',
        searchText: '',
    });

    // 상세 조회
    const postDetail = useGetPostDetail(fullPath.postid);
    const [post, setPost] = useState({
        postId: 0,
    });

    useEffect(() => {
        postDetail.refetch();
    }, []);

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
            moment(post.startDate).format('YYYY-MM-DD') <=
                moment().format('YYYY-MM-DD') &&
            moment(post.endDate).format('YYYY-MM-DD') >=
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
    const [ isLoading, setIsLoading ] = useState(false);

    const handleOnApplyButtonOnClick = async ()  => {
        try{
            await mentoringApply.mutateAsync({
                postId: post.postId,
                email: post.user.email,
            });
        
        Swal.fire('이메일 전송에 성공했습니다.');
        apply.refetch();
        setIsLoading(true);
        loginUserData.refetch();
    }catch(error){
        console.error("신청 오류:", error);
    }
                // alert('123123');
                // navigate(0);    
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

    // comment
    const useGetComments = usegGetCommentsQuery(post.postId, {
        page: page,
        limitCount: 3,
    });

    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        if (!useGetComments?.isLoading) {
            const currentPage = useGetComments?.data?.data.page || 1;
            const totalPages = useGetComments?.data?.data.totalPages || 1;
            const startIndex = Math.floor((currentPage - 1) / 5) * 5 + 1;
            const endIndex =
                startIndex + 4 > totalPages ? totalPages : startIndex + 4;

            let newPageNumbers = [];
            for (let i = startIndex; i <= endIndex; i++) {
                newPageNumbers = [...newPageNumbers, i];
            }
            setPageNumbers(newPageNumbers);
        }
    }, [useGetComments?.data]);

    useEffect(() => {
        useGetComments?.refetch();
    }, [searchParams]);

    useEffect(() => {
        console.log(useGetComments);
    }, [useGetComments.data]);

    const handlePageNumbersOnClick = (pageNumber) => {
        searchParams.set('page', pageNumber);
        setSearchParams(searchParams);
    };

    const [saveCommentValue, setSaveCommentValue] = useState({
        postId: 0,
        content: '',
        starPoint: -1,
    });

    useEffect(() => {
        setSaveCommentValue((prev) => ({
            ...prev,
            postId: Number(post.postId),
        }));
    }, [post]);

    // update, delete button(comment)

    const [updateCommentValue, setUpdateCommentValue] = useState({
        commentId: 0,
        content: '',
        starPoint: 0,
    });

    const updateCommentMutation = useUpdateCommentMutation();

    const [isModify, setIsModify] = useState(false);

    const handleUpdateOnClick = async () => {
        if (updateCommentValue.content.trim() === '') {
            await Swal.fire({
                title: '수정 실패',
                text: '댓글 내용을 입력해주세요.',
                icon: 'error',
                timer: 1000,
                showConfirmButton: false,
            });
            return;
        }
        await updateCommentMutation
            .mutateAsync(updateCommentValue)
            .then((response) => {
                Swal.fire(response.data);
                if (response.status === 200) {
                    useGetComments.refetch();
                    postDetail.refetch();
                    setIsModify(false);
                }
            })
            .catch((error) => {
                Swal.fire(error.data);
            });
    };

    const handleUpdateTextAriaOnChange = (e) => {
        setUpdateCommentValue((prev) => ({
            ...prev,
            content: e.target.value,
        }));
    };

    const handleDeleteCommentOnClick = async (comment) => {
        const result = await Swal.fire({
            title: '후기 내용 삭제',
            text: '후기 내용을 삭제하시겠습니까?',
            showConfirmButton: true,
            confirmButtonText: '확인',
            showCancelButton: true,
            cancelButtonText: '취소',
        });

        if (result.isConfirmed) {
            await deleteCommentMutation
                .mutateAsync({
                    commentId: comment.commentId,
                    userId: comment.userId,
                })
                .then(async (response) => {
                    await Swal.fire({
                        title: '삭제 성공',
                        text: '후기가 삭제되었습니다.',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });

                    if (response.status === 200) {
                        useGetComments.refetch();
                        postDetail.refetch();
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        title: '삭제 실패',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                });
        }
    };

    // 후기 작성
    const handleReviewOnChange = (e) => {
        setSaveCommentValue((prev) => ({
            ...prev,
            content: e.target.value,
        }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    // 등록
    const handleCommnetSaveOnClick = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        if (pathNm.includes('mentoring')) {
            if (
                saveCommentValue.starPoint <= 0 ||
                saveCommentValue.content.replace(/\s+/g, '') === ''
            ) {
                await Swal.fire({
                    title: '등록 실패',
                    text: '후기 등록이 실패되었습니다.',
                    icon: 'error',
                    timer: 1000,
                    showConfirmButton: false,
                });
                setIsSubmitting(false);

                return;
            }
        } else {
            if (saveCommentValue.content.replace(/\s+/g, '') === '') {
                await Swal.fire({
                    title: '등록 실패',
                    text: '후기 등록이 실패되었습니다.',
                    icon: 'error',
                    timer: 1000,
                    showConfirmButton: false,
                });

                setIsSubmitting(false);

                return;
            }
        }

        await saveCommentMutation
            .mutateAsync(saveCommentValue)
            .then(async (response) => {
                if (response.status === 200) {
                    await Swal.fire({
                        title: '등록 성공',
                        text: '후기가 등록되었습니다.',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false,
                    });

                    useGetComments.refetch();
                    postDetail.refetch();
                    setSaveCommentValue({
                        postId: 0,
                        content: '',
                        starPoint: -1,
                    });
                } else {
                    
                    await Swal.fire({
                        title: '등록 실패',
                        text: '후기 등록이 실패되었습니다.',
                        icon: 'error',
                        timer: 1000,
                        showConfirmButton: false,
                    });
                }
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handleFileDownload = async () => {
        await api
            .get(`/api/file/download/${post.attachedFiles}`, {
                responseType: 'blob',
            }) // responseType 추가
            .then((response) => {
                // response.data가 Blob 객체가 됩니다.
                const url = window.URL.createObjectURL(response.data);
                const a = document.createElement('a');
                a.href = url;
                a.download = post.attachedFiles;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch((error) => {
                console.error('파일 다운로드 오류:', error);
            });
    };

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
                                        ) <= moment().format('YYYY-MM-DD') &&
                                        moment(post.endDate).format(
                                            'YYYY-MM-DD'
                                        ) >= moment().format('YYYY-MM-DD')
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
                        <span>{post.categoryNameKor}</span>
                    </div>
                    <div css={s.row}>
                        <p>멘토링 일자</p>
                        <span>{`${post.startDate} ~ ${post.endDate}`}</span>
                    </div>
                    <div css={s.row}>
                        <p>첨부파일</p>
                        <span css={s.fileClick} onClick={handleFileDownload}>
                            {post.attachedFiles}
                        </span>
                    </div>
                </div>
            ) : (
                <div css={s.row}>
                    <p>첨부파일</p>
                    <span css={s.fileClick} onClick={handleFileDownload}>
                        {post.attachedFiles}
                    </span>
                </div>
            )}

            <div css={s.contentBox}>{parse(String(post.content || ''))}</div>

            {pathNm.includes('mentoring') ? (
                loginUserData.data.userId === post.userId ? (
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
                )
            ) : pathNm.includes('community') ? (
                loginUserData.data.userId === post.userId ? (
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
                )
            ) : (
                <></>
            )}

            {/* 주소 박스 */}
            {post.mentoringAddress && (
                <div css={s.mapBox}>
                    <p>
                        만남의 장소
                        <span>{post.mentoringAddress.split('#')[0]} </span>
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
                                        `/service/${pathNm}/update/${post.postId}`
                                        // : `//update/${post.postId}`
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
                ) : post.status === 'recruiting' && pathNm === 'mentoring' ? (
                    <button
                        type="button"
                        className="regist"
                        onClick={handleOnApplyButtonOnClick}
                        disabled={!post.apply || isLoading}
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
                <div css={s.commentBox}>
                    <div css={s.saveAndCount}>
                        <div css={s.reviewCount}>
                            후기 {useGetComments?.data?.data.totalElements}
                        </div>
                        <div>
                            <button
                                onClick={handleCommnetSaveOnClick}
                                css={s.commentSave}
                                disabled={isSubmitting}
                            >
                                등록
                            </button>
                        </div>
                    </div>

                    <div css={s.commentContainer}>
                        <div css={s.commentTopBox}>
                            <div css={s.userInfo}>
                                <div css={s.img}>
                                    <img
                                        src={`http://localhost:8080/image/user/profile/${loginUserData?.data?.profileImg}`}
                                        alt=""
                                    />
                                </div>
                                <div css={s.info}>
                                    <p css={s.nickname}>
                                        {loginUserData?.data?.nickname}
                                    </p>
                                    <p css={s.date}>
                                        {moment(
                                            loginUserData?.data?.createdAt
                                        ).format('YYYY-MM-DD')}
                                    </p>
                                </div>
                            </div>

                            {pathNm.includes('mentoring') ? (
                                <div css={s.starPointBox}>
                                    {Array.from({ length: 5 }, (_, idx) => (
                                        <FaStar
                                            key={`vcv` + idx}
                                            className={
                                                saveCommentValue.starPoint > idx
                                                    ? 'on'
                                                    : ''
                                            }
                                            onClick={() =>
                                                setSaveCommentValue((prev) => ({
                                                    ...prev,
                                                    starPoint: idx + 1,
                                                }))
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div css={s.commentBottonBox}>
                            <textarea
                                onChange={handleReviewOnChange}
                                value={saveCommentValue.content}
                                placeholder="후기입력"
                            ></textarea>
                        </div>
                    </div>
                    {useGetComments?.data?.data.commentSearchList.map(
                        (comment, idx) => {
                            return (
                                <div
                                    key={`commentList${idx}`}
                                    css={s.commentContainer}
                                >
                                    <div css={s.commentTopBox}>
                                        <div css={s.userInfo}>
                                            <div css={s.img}>
                                                <img
                                                    src={
                                                        comment.profileImg !==
                                                        null
                                                            ? `http://localhost:8080/image/user/profile/${comment.profileImg}`
                                                            : '/img/default.png'
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div css={s.info}>
                                                <p css={s.nickname}>
                                                    {comment.nickname}
                                                </p>
                                                <p css={s.date}>
                                                    {moment(
                                                        comment.createdAt
                                                    ).format('YYYY-MM-DD')}
                                                </p>
                                            </div>
                                        </div>
                                        {comment?.userId ===
                                        loginUserData?.data?.userId ? (
                                            <div css={s.buttonContainer}>
                                                {isModify &&
                                                comment.commentId ===
                                                    updateCommentValue.commentId ? (
                                                    <button
                                                        onClick={
                                                            handleUpdateOnClick
                                                        }
                                                        css={s.updateBox}
                                                    >
                                                        등록
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setIsModify(true);
                                                            setUpdateCommentValue(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    commentId:
                                                                        comment.commentId,
                                                                    content:
                                                                        comment.content,
                                                                    starPoint:
                                                                        comment.starPoint,
                                                                })
                                                            );
                                                        }}
                                                        css={s.updateBox}
                                                    >
                                                        수정
                                                    </button>
                                                )}
                                                <button
                                                    css={s.deleteBox}
                                                    onClick={() => {
                                                        handleDeleteCommentOnClick(
                                                            comment
                                                        );
                                                    }}
                                                >
                                                    삭제
                                                </button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        {pathNm.includes('mentoring') ? (
                                            <div css={s.starPointBox}>
                                                {' '}
                                                {Array.from(
                                                    { length: 5 },
                                                    (_, idx) => (
                                                        <FaStar
                                                            key={`vcv` + idx}
                                                            className={
                                                                // comment.userId === loginUserData?.data?.userId ? updateCommentValue.starPoint === -1 ? comment.starPoint > idx ? 'on' : "" : updateCommentValue.starPoint > idx ? 'on' : "": comment.starPoint > idx ? 'on' : ""

                                                                comment.userId ===
                                                                    loginUserData
                                                                        ?.data
                                                                        ?.userId &&
                                                                comment.commentId ===
                                                                    updateCommentValue.commentId
                                                                    ? updateCommentValue.starPoint >
                                                                      idx
                                                                        ? 'on'
                                                                        : ''
                                                                    : comment.starPoint >
                                                                      idx
                                                                    ? 'on'
                                                                    : ''
                                                            }
                                                            onClick={() => {
                                                                if (
                                                                    comment.userId ===
                                                                        loginUserData
                                                                            ?.data
                                                                            ?.userId &&
                                                                    isModify
                                                                ) {
                                                                    setUpdateCommentValue(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            starPoint:
                                                                                idx +
                                                                                1,
                                                                        })
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div css={s.commentBottonBox}>
                                        {isModify &&
                                        loginUserData?.data?.userId ===
                                            comment.userId &&
                                        comment.commentId ===
                                            updateCommentValue.commentId ? (
                                            <textarea
                                                onChange={
                                                    handleUpdateTextAriaOnChange
                                                }
                                                placeholder="후기입력"
                                                value={
                                                    updateCommentValue.content
                                                }
                                            ></textarea>
                                        ) : (
                                            comment.content
                                        )}
                                    </div>
                                </div>
                            );
                        }
                    )}
                    <div css={s.footer}>
                        <div css={s.pageNumbers}>
                            <button
                                disabled={useGetComments?.data?.data.firstPage}
                                onClick={() =>
                                    handlePageNumbersOnClick(page - 1)
                                }
                            >
                                <GoChevronLeft />
                            </button>
                            {pageNumbers.map((number) => (
                                <button
                                    key={`ticket${number}`}
                                    css={s.pageNum(page === number)}
                                    onClick={() =>
                                        handlePageNumbersOnClick(number)
                                    }
                                >
                                    <span>{number}</span>
                                </button>
                            ))}
                            <button
                                disabled={useGetComments?.data?.data.lastPage}
                                onClick={() =>
                                    handlePageNumbersOnClick(page + 1)
                                }
                            >
                                <GoChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : (
        <></>
    );
}
