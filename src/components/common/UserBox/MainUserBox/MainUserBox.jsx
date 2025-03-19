/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import * as s from './style';
import { useNavigate } from "react-router-dom";

const MainUserBox = () => {
    const navigate = useNavigate();

    const handleMyPageButtonOnClick = () => {
        navigate("/mypage");
    }

    const handleMentoringRegistButtonOnClick = () => {
        navigate("/:boardName/regist");
    }
    return (
        <div css={s.userBoxContainer}>
         
            <div css={s.profileImage}></div>

           
            <div css={s.nickname}>닉네임</div>
            <div css={s.joinDate}>2025.01.11 가입</div>

            
            <div css={s.mentorSection}>
                <div>멘토</div>
                <div css={s.starRating}>★★★★★</div>
            </div>

           
            <div css={s.mentoringInfo}>
                <div>✏️ 내가 등록한 멘토링 <strong>3</strong></div>
                <div>✏️ 등록 가능한 멘토링 갯수 <strong>17</strong></div>
            </div>

         
            <div css={s.buttonContainer}>
                <button css={s.styledButton} onClick={handleMyPageButtonOnClick}>마이페이지</button>
                <button css={s.styledButton} onClick={handleMentoringRegistButtonOnClick}>멘토링 등록</button>
            </div>

         
            <a href="#" css={s.logoutLink}>로그아웃</a>
        </div>
    );
};

export default MainUserBox;
