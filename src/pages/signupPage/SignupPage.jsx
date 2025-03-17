/**@jsxImportSource @emotion/react */
import Footer from '../../components/common/Footer/Footer';
import Header from '../../components/common/Header/Header';
import * as s from './style';
import React from 'react';

function SignupPage(props) {
    return (
        <div css={s.signup}>
            <header css={s.header}>
                <h1 css={s.logo}>
                    <img src={'../../public/img/img_logo_white.svg'} alt="로고" />
                </h1>
            </header>
            <div css={s.container}>
                <div css={s.inputContainer}>
                    <h1 css={s.signupHeader}>회원가입</h1>
                    <div css={s.inputBox}>
                        <span>분류</span>
                        <select>
                            <option value="" disabled selected>
                                분류
                            </option>
                            <option value="menti">멘티</option>
                            <option value="mentor">멘토</option>
                        </select>
                    </div>
                    <div css={s.inputBox}>
                        <span>이름</span>
                        <input type="text" placeholder="이름을 입력하세요" />
                    </div>
                    <div css={s.inputBox}>
                        <span>이메일</span>
                        <input type="email" placeholder="이메일을 입력하세요" />
                    </div>
                    <div css={s.inputBox}>
                        <span>비밀번호</span>
                        <input type="password" placeholder="비밀번호를 입력하세요" />
                    </div>
                    
                    <button css={s.signupButton}>가입하기</button>
                    <button css={s.oauthButton}>Google로 가입</button>
                    <button css={s.oauthButton2}>Naver로 가입</button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;