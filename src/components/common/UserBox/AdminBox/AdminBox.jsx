/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import * as s from './style';
import { data, useNavigate } from 'react-router-dom';
import { setTokenLocalStorage } from '../../../../configs/axiosConfig';
import { useQueryClient } from '@tanstack/react-query';
import { useUserMeQuery } from '../../../../queries/userQuery';
import { useGetAdminUsers } from '../../../../queries/adminQuery';
import { useEffect } from 'react';
import moment from 'moment';

const AdminBox = () => {
    const navigate = useNavigate();
    const loginUser = useUserMeQuery();

    const { data: adminUserList } = useGetAdminUsers({
        page: 1,
        limitCount: 15,
    });

    const totalUser = adminUserList?.data?.userList?.[0]?.totalUser;
    

    const queryClient = useQueryClient();
    const loginUserData = queryClient.getQueryData(['userMeQuery']);

    const createdAt = moment(loginUserData.data.createdAt).format("YYYY-MM-DD");

    const handleAdminOnClick = () => {
        navigate('/service/admin');
    };

    useEffect(() => {
        console.log(loginUser);
    }, loginUser?.data)

    const handleLogoutButtonOnClick = async () => {
        setTokenLocalStorage('AccessToken', null);
        await queryClient.invalidateQueries({ queryKey: ['userMeQuery'] });
        navigate('/home');
    };
    const profileImg = loginUserData?.data?.profileImg;
    const nickname = loginUserData?.data?.nickname;

    return (
        <div css={s.userBoxContainer}>
            <div css={s.profileImage}>
                {profileImg ? (
                    <img
                        src={`http://localhost:8080/image/user/profile/${profileImg}`}
                        alt="프로필 이미지"
                        css={s.profileImgStyle}
                    />
                ) : (
                    <img
                        src="/default.png"
                        alt="기본 프로필 이미지"
                        css={s.profileImgStyle}
                    />
                )}
            </div>
            <div css={s.nickname}>
                {nickname ? nickname : '닉네임이 없습니다.'}
            </div>
            <div css={s.joinDate}>가입 : {createdAt}</div>

            <div css={s.mentorSection}>
                <div>관리자</div>
                <div css={s.starRating}>총 회원수 : {totalUser}</div>
            </div>

            <div css={s.buttonContainer}>
                <button css={s.styledButton} onClick={handleAdminOnClick}>
                    CMS
                </button>
            </div>

            <a href="/" css={s.logoutLink} onClick={handleLogoutButtonOnClick}>
                로그아웃
            </a>
        </div>
    );
};

export default AdminBox;
