/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import * as s from './style';
import { useNavigate } from 'react-router-dom';
import { setTokenLocalStorage } from '../../../../configs/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateProfileImageMutation } from '../../../../mutations/mypageMutation';
import { useUserMeQuery } from '../../../../queries/userQuery';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

const MentoUserBox = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const loginUser = useUserMeQuery();

    const loginUserData = queryClient.getQueryData(['userMeQuery']);

    const nickname = loginUserData?.data?.nickname;
    const formattedDate = loginUserData?.data?.createdAt?.substring(0, 10);
    const remainPoint = loginUserData?.data?.remainPoint;
    const remaining = loginUserData?.data?.remaining;
    const starPoint = loginUserData?.data?.starPoint;

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    
    const profileImg = `http://localhost:8080/image/user/profile/${loginUser?.data?.data.profileImg}`

    const handleMyPageButtonOnClick = () => {
        navigate('/service/mypage');
    };

    const handleMentoringRegistButtonOnClick = () => {
        navigate('/service/mentoring/regist');
    };

    const handleLogoutButtonOnClick = async () => {
        setTokenLocalStorage('AccessToken', null);
        await queryClient.invalidateQueries({ queryKey: ['userMeQuery'] });
        navigate('/home');
    };

    const handleImgClickBtn = () =>{
        setIsModalOpen(true);
    }

    const handleImgCloseBtn = () => {
        setIsModalOpen(false);
    }



    return (
        <div css={s.userBoxContainer}>

            <div css={s.joinDate}>가입 일자: {formattedDate}</div>
            <div css={s.profileImageContainer}>
                <label css={s.profileImage} onClick={handleImgClickBtn}>
                                    {loginUser.isLoading || (
                                        <img
                                            src={profileImg}
                                            alt=""
                                        />
                                    )}
                                    
                                </label>

            </div>

            <div css={s.nickname}>{nickname}</div>


            <div css={s.mentorSection}>

                {starPoint >= 0 && (
                    <div css={s.starBox}>
                        평점: {Array.from(
                            { length: starPoint },
                            (_, index) => (
                                <FaStar
                                    key={`detailStarPont_${index}`}
                                />
                            )
                        )}
                        <p>( {starPoint} )</p>
                    </div>
                )}
            </div>

            <div css={s.mentoringInfo}>
                <div> 나의 포인트: {remainPoint}</div>
                <div>✏️ 등록 가능한 멘토링 갯수: {remaining} </div>
            </div>

            <div css={s.buttonContainer}>
                <button
                    css={s.styledButton}
                    onClick={handleMyPageButtonOnClick}
                >
                    마이페이지
                </button>
                <button
                    css={s.styledButton}
                    onClick={handleMentoringRegistButtonOnClick}
                >
                    멘토링 등록
                </button>
            </div>

            <a href="/" css={s.logoutLink} onClick={handleLogoutButtonOnClick}>
                로그아웃
            </a>

            {isModalOpen && (
                <div css={s.modalOverlay} >
                    <div css={s.modalContent}>
                        <img src={profileImg} alt="Profile" css={s.modalImage} />
                        <button css={s.closeButton} onClick={handleImgCloseBtn}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MentoUserBox;
