/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import * as s from './style';
import { useNavigate } from 'react-router-dom';
import { setTokenLocalStorage } from '../../../../configs/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateProfileImageMutation } from '../../../../mutations/mypageMutation';
import { useGetMentoringApplyHistoryQuery, useUserMeQuery } from '../../../../queries/userQuery';
import { FaStar } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const MentiUserBox = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const loginUser = useUserMeQuery();

    const loginUserData = queryClient.getQueryData(['userMeQuery']);
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    
    const nickname = loginUserData?.data?.nickname;
    const formattedDate = loginUserData?.data?.createdAt?.substring(0, 10);

    const profileImg = `http://localhost:8080/image/user/profile/${loginUser?.data?.data.profileImg}`
    const totalApplyMentoring = useGetMentoringApplyHistoryQuery({
        page: 1,
        limitCount: 10,
        order: "desc",
        searchText:"",
    });


    const handleMyPageButtonOnClick = () => {
        navigate('/service/mypage');
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


            <div css={s.mentoringInfo}>
                <div>✏️ 멘토링 신청 개수 : {totalApplyMentoring?.data?.data.totalElements} </div>
            </div>

            <div css={s.buttonContainer}>
                <button
                    css={s.styledButton}
                    onClick={handleMyPageButtonOnClick}
                >
                    마이페이지
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

export default MentiUserBox;
