/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import * as s from './style';
import { useNavigate } from 'react-router-dom';
import { setTokenLocalStorage } from '../../../../configs/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateProfileImageMutation } from '../../../../mutations/mypageMutation';
import { useGetMentoringApplyHistoryQuery, useUserMeQuery } from '../../../../queries/userQuery';
import { FaStar } from 'react-icons/fa';
import { useEffect } from 'react';

const MentiUserBox = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const loginUser = useUserMeQuery();

    const loginUserData = queryClient.getQueryData(['userMeQuery']);
    
    const nickname = loginUserData?.data?.nickname;
    const formattedDate = loginUserData?.data?.createdAt?.substring(0, 10);

    const totalApplyMentoring = useGetMentoringApplyHistoryQuery({
        page: 1,
        limitCount: 10,
        order: "desc",
        searchText:"",
    });
    // const totalApplyMentoring = queryClient.getQueryData(['useGetMentoringApplyHistoryQuery']);
    // // const totalApplyHistory = totalApplyMentoring?.data?.totalElements;
    useEffect(()=>{
        console.log(totalApplyMentoring);
    },[totalApplyMentoring?.data])
    
    const updateProfileImageMutation = useUpdateProfileImageMutation();

    const handleMyPageButtonOnClick = () => {
        navigate('/service/mypage');
    };

    const handleLogoutButtonOnClick = async () => {
        setTokenLocalStorage('AccessToken', null);
        await queryClient.invalidateQueries({ queryKey: ['userMeQuery'] });
        window.location.reload();
    };

    const handleProfileImageFileOnChange = async (e) => {
        const fileLiST = e.target.files;
        const file = fileLiST[0];

        const formData = new FormData();
        formData.append('file', file);

        await updateProfileImageMutation.mutateAsync(formData);
        loginUser.refetch();
    };

    return (
        <div css={s.userBoxContainer}>
            
            <div css={s.joinDate}>가입 일자: {formattedDate}</div>
            <div css={s.profileImageContainer}>
                <label css={s.profileImage}>
                    {loginUser.isLoading || (
                        <img
                            src={`http://localhost:8080/image/user/profile/${loginUser?.data?.data.profileImg}`}
                            alt=""
                        />
                    )}
                    <input
                        type="file"
                        onChange={handleProfileImageFileOnChange}
                    />
                </label>

            </div>

            <div css={s.nickname}>{nickname}</div>


            <div css={s.mentorSection}>
                
                
            </div>

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
        </div>
    );
};

export default MentiUserBox;
