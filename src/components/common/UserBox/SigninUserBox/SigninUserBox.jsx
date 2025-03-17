/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';
import { SiNaver } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";


function SigninUserBox(props) {

    return (
        <body css={s.body}>
            <div css={s.signinUserBox}>
                <form>
                    <label for="username">아이디</label>
                    <input type="text" id="username" placeholder="아이디 입력"/>

                    <label for="password">비밀번호</label>
                    <input type="password" id="password" placeholder="비밀번호 입력" />
                    
                    <div css={s.buttonContainer}>
                        <button css={s.googleButton}>
                            <FcGoogle /> Continue with Google
                        </button>
                        <button css={s.naverButton}>
                            <SiNaver />Continue with Naver
                        </button>
                    </div>

                    <div>
                        <button css={s.loginButton}>로그인</button>
                    </div>
                    
                    <div>
                        <button css={s.signupButton}>회원가입</button>
                    </div>
                    
                </form>
            </div>
        </body>
    );
}

export default SigninUserBox;