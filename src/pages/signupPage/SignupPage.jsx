/**@jsxImportSource @emotion/react */
import { useNavigate } from 'react-router-dom';
import ValidInput from '../../components/auth/ValidInput/ValidInput';
import Footer from '../../components/common/Footer/Footer';
import Header from '../../components/common/Header/Header';
import { useSignupMutation } from '../../mutations/authMutation';
import * as s from './style';
import React, { useState } from 'react';

function SignupPage(props) {
    const navigator = useNavigate();
    const signupMutation = useSignupMutation();

    const [roleIdValue, setRoleIdValue] = useState(1);

    const [inputValue, setInputValue] = useState({
        username: '',
        password: '',
        passwordCheck: '',
        email: '',
        nickname: '',
    });

    const [inputValidError, setInputValidError] = useState({
        username: false,
        password: false,
        passwordCheck: false,
        email: false,
    });

    const handleInputOnChange = (e) => {
        setInputValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const isError = () => {
        const isEmpty = Object.values(inputValue)
            .map((value) => !!value)
            .includes(false);
        const isValid = Object.values(inputValidError).includes(true);
        return isEmpty || isValid;
    };

    const handlePasswordOnFocus = () => {
        setInputValue((prev) => ({
            ...prev,
            password: '',
            passwordCheck: '',
        }));
    };

    const handleRoleSelectBarOnChange = (e) => {
        setRoleIdValue(e.target.value);
    };

    const handleSignupButtonOnClick = () => {
        if (isError()) {
            alert('사용자 정보를 다시 입력하세요');
            return;
        }

        signupMutation
            .mutateAsync({
                roleId: roleIdValue,
                username: inputValue.username,
                password: inputValue.password,
                email: inputValue.email,
                nickname: inputValue.nickname,
            })
            .then((response) => {
                alert('가입해 주셔서 감사합니다');
                navigator('/home');
            })
            .catch((error) => {
                if (error.status === 400) {
                    setInputValidError((prev) => ({
                        ...prev,
                        username: true,
                    }));
                }
            });
    };

    return (
        <div css={s.signup}>
            <header css={s.header}>
                <h1 css={s.logo}>
                    <img
                        src={'../../public/img/img_logo_white.svg'}
                        alt="로고"
                    />
                </h1>
            </header>
            <div css={s.container}>
                <div css={s.inputContainer}>
                    <h1 css={s.signupHeader}>회원가입</h1>
                    <div css={s.inputBox}>
                        <span>분류</span>
                        <select
                            defaultValue={'1'}
                            name="role"
                            value={roleIdValue}
                            onChange={handleRoleSelectBarOnChange}
                        >
                            <option value="1">멘티</option>
                            <option value="2">멘토</option>
                        </select>
                    </div>
                    <div css={s.inputBox}>
                        <span>이름</span>
                        <ValidInput
                            type={'text'}
                            placeholder={'Enter your username...'}
                            name={'username'}
                            regexp={/^[a-zA-Z0-9]{3,20}$/}
                            errorMessage={'사용할 수 없는 사용자 이름입니다.'}
                            value={inputValue.username}
                            onChange={handleInputOnChange}
                            inputValidError={inputValidError}
                            setInputValidError={setInputValidError}
                        />
                    </div>
                    <div css={s.inputBox}>
                        <span>비밀번호</span>
                        <ValidInput
                            type={'password'}
                            placeholder={'Enter your password...'}
                            name={'password'}
                            regexp={
                                /^(?=.*\d)(?=.*[!@#\$%\^&\*])[A-Za-z\d!@#\$%\^&\*]{8,20}$/
                            }
                            errorMessage={'사용할 수 없는 비밀번호입니다.'}
                            value={inputValue.password}
                            onChange={handleInputOnChange}
                            onFocus={handlePasswordOnFocus}
                            inputValidError={inputValidError}
                            setInputValidError={setInputValidError}
                        />
                    </div>
                    <div css={s.inputBox}>
                        <span>비밀번호 확인</span>
                        <ValidInput
                            type={'password'}
                            placeholder={'Enter your password...'}
                            name={'passwordCheck'}
                            regexp={new RegExp(`^${inputValue.password}$`)}
                            errorMessage={'비밀번호가 일치하지 않습니다.'}
                            value={inputValue.passwordCheck}
                            onChange={handleInputOnChange}
                            inputValidError={inputValidError}
                            setInputValidError={setInputValidError}
                        />
                    </div>
                    <div css={s.inputBox}>
                        <span>이메일</span>
                        <ValidInput
                            type={'text'}
                            placeholder={'Enter your email...'}
                            name={'email'}
                            regexp={
                                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                            }
                            errorMessage={'사용할 수 없는 이메일입니다.'}
                            value={inputValue.email}
                            onChange={handleInputOnChange}
                            inputValidError={inputValidError}
                            setInputValidError={setInputValidError}
                        />
                    </div>

                    <div css={s.inputBox}>
                        <span>닉네임</span>
                        <ValidInput
                            type={'text'}
                            placeholder={'Enter your username...'}
                            name={'nickname'}
                            regexp={/^[a-zA-Z0-9_-]{3,15}$/}
                            errorMessage={'사용할 수 없는 사용자 이름입니다.'}
                            value={inputValue.nickname}
                            onChange={handleInputOnChange}
                            inputValidError={inputValidError}
                            setInputValidError={setInputValidError}
                        />
                    </div>

                    <button
                        css={s.signupButton}
                        onClick={handleSignupButtonOnClick}
                    >
                        가입하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
