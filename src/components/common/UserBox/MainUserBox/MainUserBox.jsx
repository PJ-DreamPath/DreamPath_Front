/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { TiAttachmentOutline } from "react-icons/ti";
import React, { useEffect, useState } from "react";
import axios from "axios";

function MainUserBox() {
   

    return (
        <div css={s.body}>
            <div css={s.mainUserBox}>
                <div css={s.profileImg}>
                    <img src={user.profileImg || "default-profile.png"} alt="프로필 이미지" />
                    <div>
                        <p>{user.nickname || "닉네임"}</p>
                        <p>{user.joinDate || "가입일 미확인"}</p>
                    </div>
                </div>

                {roleId === 2 ? (
                    // 멘토 UI
                    <div>
                        <div css={s.starPoint}>
                            <p>멘토</p>
                            <p>⭐️⭐️⭐️⭐️⭐️</p>
                        </div>
                        <div css={s.mentoringButton}>
                            <button><TiAttachmentOutline /> 내가 등록한 멘토링 <span>3</span></button>
                            <button><TiAttachmentOutline /> 등록 가능한 멘토링 개수 <span>17</span></button>
                        </div>
                        <div css={s.footerButton}>
                            <button>마이페이지</button>
                            <button>멘토링 등록</button>
                        </div>
                    </div>
                ) : (
                    // 멘티 UI
                    <div css={s.mentiBox}>
                        <p>멘티</p>
                        <button css={s.mentiMentoringButton}><TiAttachmentOutline /> 멘토링 신청 내역 <span>3</span></button>
                        <button css={s.myPageButton}>마이페이지</button>
                    </div>
                )}

                <button css={s.logoutButton} onClick={() => localStorage.removeItem("AccessToken")}>
                    로그아웃
                </button>
            </div>
        </div>
    );
}

export default MainUserBox;
