/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import * as s from './style';
import { useNavigate } from "react-router-dom";
import { setTokenLocalStorage } from "../../../../configs/axiosConfig";
import { useQueryClient } from "@tanstack/react-query";

const MainUserBox = () => {
    const navigate = useNavigate();
    
    const queryClient = useQueryClient();
    const loginUserData = queryClient.getQueryData(["userMeQuery"]);


    const profileImg = loginUserData?.data?.profileImg;
    const nickname = loginUserData?.data?.nickname;
    const roleName = loginUserData?.data?.roleName;
    const formattedDate = loginUserData?.data?.createdAt?.substring(0, 10);
    const remainPoint = loginUserData?.data?.remainPoint;
    const remaining = loginUserData?.data?.remaining;

    console.log("loginUserData:", loginUserData);

    const handleMyPageButtonOnClick = () => {
        console.log("!!!")
        navigate("/service/mypage");
        
    }

    const handleMentoringRegistButtonOnClick = () => {
        navigate("/service/mentoring/regist");
    }

    const handleLogoutButtonOnClick = async () => {
        setTokenLocalStorage("AccessToken", null);
        await queryClient.invalidateQueries({queryKey: ["userMeQuery"]});
        window.location.reload();
        
    }

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

           
            <div css={s.nickname}>{nickname}</div>
            
            <div css={s.joinDate}>{formattedDate}</div>

            
            <div css={s.mentorSection}>
                <div>{roleName}</div>
                <div css={s.starRating}>★★★★★</div>
            </div>

           
            <div css={s.mentoringInfo}>
                <div> 나의 포인트: {remainPoint}</div>
                <div>✏️ 등록 가능한 멘토링 갯수: {remaining} </div>
            </div>

         
            <div css={s.buttonContainer}>
                <button css={s.styledButton} onClick={handleMyPageButtonOnClick}>마이페이지</button>
                <button css={s.styledButton} onClick={handleMentoringRegistButtonOnClick}>멘토링 등록</button>
            </div>

         
            <a href="/" css={s.logoutLink} onClick={handleLogoutButtonOnClick}>로그아웃</a>
        </div>
    );
};

export default MainUserBox;
