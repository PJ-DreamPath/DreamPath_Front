/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import * as s from './style';
import { data, useNavigate } from "react-router-dom";
import { setTokenLocalStorage } from "../../../../configs/axiosConfig";
import { useQueryClient } from "@tanstack/react-query";
import { useUserMeQuery } from "../../../../queries/userQuery";
import { useGetAdminUsers } from "../../../../queries/adminQuery";

const AdminBox = () => {
    const navigate = useNavigate();

    const { data: adminUserList} = useGetAdminUsers({ page: 1, limitCount: 15 });

    const totalUser = adminUserList?.data?.userList?.[0]?.totalUser;
    const createdAt = adminUserList?.data?.userList?.[0]?.createdAt;
    const formattedDate = createdAt ? createdAt.split("T")[0] : "가입 날짜 없음"; 

    
    
    const queryClient = useQueryClient();
    const loginUserData = queryClient.getQueryData(["userMeQuery"]);
    console.log("Login User Data:", useUserMeQuery());

    const handleAdminOnClick = () => {
        console.log("!!!")
        navigate("/service/admin");
        
    }

    const handleLogoutButtonOnClick = async () => {
        setTokenLocalStorage("AccessToken", null);
        await queryClient.invalidateQueries({queryKey: ["userMeQuery"]});
        window.location.reload();
        
    }
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
            <div css={s.nickname}>{nickname ? nickname: "닉네임이 없습니다."}</div>
            <div css={s.joinDate}>가입:{formattedDate}</div>

            
            <div css={s.mentorSection}>
                <div>관리자</div>
                <div css={s.starRating}>총 회원수:{totalUser}</div>
            </div>
         
            <div css={s.buttonContainer}>
                <button css={s.styledButton} onClick={handleAdminOnClick}>CMS</button>
            </div>

         
            <a href="/" css={s.logoutLink} onClick={handleLogoutButtonOnClick}>로그아웃</a>
        </div>
    );
};

export default AdminBox;
