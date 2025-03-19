import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignupPage from '../../pages/signupPage/SignupPage';
import SigninUserBox from '../../components/common/UserBox/SigninUserBox/SigninUserBox';
import { useQueryClient } from '@tanstack/react-query';

function AuthRoute(props) {


    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState(["userMeQuery"]);

    useEffect(() => {
        // queryState가 없거나 에러 상태면 최상위 페이지("/")로 이동
        if (!queryState || queryState.status === "error") {
            navigate("/");
        }
    }, [queryState, navigate]);


    return (
        <>
            {
                queryState.status === "success" &&
                <Routes>

                    <Route path="/login" element={<SigninUserBox />}></Route>
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>

            }
        </>
    );
}

export default AuthRoute;