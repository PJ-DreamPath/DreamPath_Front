/** @jsxImportSource @emotion/react */
import * as s from './style';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
import { useUserMeQuery } from '../../queries/userQuery';
import { useDeleteCommentMutation, useSaveCommentMutation, useUpdateCommentMutation } from '../../mutations/mentoringCommentMutation';
import Quill from 'quill';
import { usegetCommentsQuery } from '../../queries/commentQuery';

export default function PostDetailPage({ }) {
    const navigate = useNavigate();

    const updateCommentMutation = useUpdateCommentMutation();
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


    // comment
    // const [commentValue, setCommentValue] = useState("");
    // const [starPoint, setStarPoint] = useState(-1);
    // const [reviewText, setReviewText] = useState('');

    const useGetComments = usegetCommentsQuery({
        page: 1,
        limitCount: 3,
    });
    const [searchParams, setSearchParams] = useSearchParams();

    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        if (!useGetComments?.isLoading) {
            const currentPage = useGetComments?.data?.data.page || 1;
            const totalPages =
                useGetComments?.data?.data.totalPages || 1;
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
        console.log(useGetComments);
        useGetComments?.refetch();
    }, [searchParams]);

    const handlePageNumbersOnClick = (pageNumber) => {
        searchParams.set('page', pageNumber);
        setSearchParams(searchParams);
    };

    const [saveCommentValue, setSaveCommentValue] = useState({
        postId: 0,
        content: "",
        starPoint: -1

    });


    useEffect(() => {
        setSaveCommentValue((prev) => ({
            ...prev,
            postId: Number(post.postId)
        }))
    }, [post])

    // update, delete button(comment)
    const handleUpdateOnClick = async () => {

        const result = await Swal.fire({
            title: "후기 내용 수정",
            text: "작성하신 내용으로 수정하겠습니까?",
            showConfirmButton: true,
            confirmButtonText: "확인",
            showCancelButton: true,
            cancelButtonText: "취소",

        });

        if (result.isConfirmed) {

            await updateCommentMutation.mutateAsync(commentValue).then(async (response) => {

                await Swal.fire({
                    title: "수정 성공",
                    text: "후기가 수정되었습니다.",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false
                });
            })
                .catch((error) => {
                    Swal.fire({
                        title: "수정 실패",
                        icon: "error",
                        timer: 1000,
                        showConfirmButton: false

                    });

                });
        }
    }

    const handleDeleteOnClick = async () => {

        const result = await Swal.fire({
            title: "후기 내용 삭제",
            text: "후기 내용을 삭제하시겠습니까?",
            showConfirmButton: true,
            confirmButtonText: "확인",
            showCancelButton: true,
            cancelButtonText: "취소",

        });
        if (result.isConfirmed) {
            await deleteCommentMutation.mutateAsync(commentValue).then(async (response) => {

                await Swal.fire({
                    title: "삭제 성공",
                    text: "후기가 삭제되었습니다.",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false
                });
            })
                .catch((error) => {
                    Swal.fire({
                        title: "삭제 실패",
                        icon: "error",
                        timer: 1000,
                        showConfirmButton: false

                    });

                });
        }
    }

    // 후기 작성
    const handleReviewOnChange = (e) => {
        setSaveCommentValue((prev) => ({
            ...prev,
            content: e.target.value
        }))
    };



    // 등록
    const handleCommnetSaveOnClick = async () => {
        if (saveCommentValue.starPoint <= 0 || saveCommentValue.content === "") {
            await Swal.fire({
                title: "등록 실패",
                text: "후기 등록이 실패되었습니다.",
                icon: "error",
                timer: 1000,
                showConfirmButton: false
            });

            return;
        }

        await saveCommentMutation.mutateAsync(saveCommentValue).then(async (response) => {
            if (response.status === 200) {
                await Swal.fire({
                    title: "등록 성공",
                    text: "후기가 등록되었습니다.",
                    icon: "success",
                    timer: 1000,
                    showConfirmButton: false
                });
            } else {
                await Swal.fire({
                    title: "등록 실패",
                    text: "후기 등록이 실패되었습니다.",
                    icon: "error",
                    timer: 1000,
                    showConfirmButton: false
                });
            }
        })

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
                                        pathNm === 'mentoring'
                                            ? `/service/mentoring/update/${post.postId}`
                                            : `/${pathNm}/update/${post.postId}`
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
                ) : post.status === 'recruiting' &&  pathNm === 'mentoring' ? (
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
                <div css={s.commentBox}>
                    <div css={s.saveAndCount}>
                        <div css={s.reviewCount}>후기 {length}</div>
                        <div>
                            <button onClick={handleCommnetSaveOnClick} css={s.commentSave}>등록</button>
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
                                        {moment(loginUserData?.data?.createdAt).format("YYYY-MM-DD")}
                                    </p>
                                </div>
                            </div>
                            <div css={s.starPointBox}> {Array.from({ length: 5 }, (_, idx) => (<FaStar key={`vcv` + idx} className={saveCommentValue.starPoint > idx ? 'on' : ""} onClick={() => setSaveCommentValue((prev) => ({
                                ...prev,
                                starPoint: idx + 1
                            }))} />
                            ))}


                            </div>
                        </div>
                        <div css={s.commentBottonBox}>
                            <textarea onChange={handleReviewOnChange} placeholder='후기입력'>

                            </textarea>
                        </div>

                    </div>
















                    {/* <div css={s.commentWriteBox}>
                    </div>
                    <div css={s.commentReviewBox}>
                        <div css={s.profile_section}>
                            
                                <div css={s.profile_img}>
                                {loginUser.isLoading || (
                                <img
                                    src={`http://localhost:8080/image/user/profile/${loginUser?.data?.data.profileImg}`}
                                    alt=""
                                />
                                )}
                            
                                </div>
                                <div css={s.profile_Info}>
                                    <div css={s.saveNickname}>
                                    {loginUser.isLoading || (
                                            <span>{loginUser?.data?.data.nickname || '닉네임 없음'}</span>
                                        )}
                                    </div>
                                    <div css={s.createDate}>{commentDate}</div>
                                </div>
                          
                            <div css={s.comment_action}>
                               
                                    <button onClick={handleUpdateOnClick} css={s.updateBox}>수정</button>
                                    <button onClick={handleDeleteOnClick} css={s.deleteBox}>삭제</button>
                              
                                <div css={s.starPoint}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star} onClick={() => setStarPoint(star)}
                                            style={{color: starPoint >= star ? "gold" : "#D9D9D9",
                                                
                                            }}>
                                                ★
                                            </span>
                                    ))}
                                </div> 
                            </div> 
                        </div>
                        
                        <div css={s.line}></div>

                        <div  onChange={handleReviewOnChange} css={s.review} placeholder='후기를 작성해주세요.' >후기 작성
                            

                        </div>
                    
                </div> */}
                </div>


            )}
        </>
    ) : (
        <></>
    );
}
