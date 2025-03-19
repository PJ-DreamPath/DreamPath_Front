import React, { useEffect, useState } from 'react';
import * as s from './style';
import { SiNaver } from 'react-icons/si';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useLoginMutation } from '../../../../mutations/authMutation';
import MainUserBox from '../MainUserBox/MainUserBox';
import Swal from 'sweetalert2';
import { setTokenLocalStorage, getTokenFromLocalStorage } from '../../../../configs/axiosConfig';

function SigninUserBox() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const loginMutation = useLoginMutation();
    
    const [searchParams] = useSearchParams();
    const [isLoggedIn, setIsLoggedIn] = useState(!!getTokenFromLocalStorage()); 

    const [inputValue, setInputValue] = useState({
        username: searchParams.get("username") || "",
        password: ""
    });

    useEffect(() => {
        if (getTokenFromLocalStorage()) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleInputOnChange = (e) => {
        setInputValue(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignupOnClick = () => {
        navigate("/auth/signup");
    };

    const handleLoginOnClick = async () => {
        try {
            const response = await loginMutation.mutateAsync(inputValue);

            const tokenName = response.data.name;
            const accessToken = response.data.token;

            setTokenLocalStorage(tokenName, accessToken);
            setIsLoggedIn(true);

            await Swal.fire({
                icon: "success",
                text: "로그인 성공",
                timer: 1000,
                position: "center",
                showConfirmButton: false,
            });

            await queryClient.invalidateQueries({ queryKey: ["userMeQuery"] });
        } catch (error) {
            await Swal.fire({
                title: "로그인 실패",
                text: "사용자 정보를 다시 확인해주세요.",
                confirmButtonText: "확인",
                confirmButtonColor: "#e22323",
            });
        }
    };

    if (isLoggedIn) {
        return <MainUserBox />;
    }

    return (
        <div css={s.body}>
            <div css={s.signinUserBox}>
                <form>
                    <label htmlFor="username">아이디</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="아이디 입력"
                        onChange={handleInputOnChange}
                    />

                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="비밀번호 입력"
                        onChange={handleInputOnChange}
                    />

                    <div css={s.buttonContainer}>
                        <button css={s.googleButton}>
                            <FcGoogle /> Continue with Google
                        </button>
                        <button css={s.naverButton}>
                            <SiNaver /> Continue with Naver
                        </button>
                    </div>

                    <div>
                        <button css={s.loginButton} type="button" onClick={handleLoginOnClick}>
                            로그인
                        </button>
                    </div>

                    <div>
                        <button css={s.signupButton} type="button" onClick={handleSignupOnClick}>
                            회원가입
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SigninUserBox;
