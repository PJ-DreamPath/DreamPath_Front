import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignupPage from '../../pages/signupPage/SignupPage';
import SigninUserBox from '../../components/common/UserBox/SigninUserBox/SigninUserBox';

function AuthRoute(props) {
    return (
        <>
            <Routes>
                
                <Route path="/login" element={<SigninUserBox />}></Route>
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </>

    );
}

export default AuthRoute;