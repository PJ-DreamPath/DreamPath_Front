import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignupPage from '../../pages/signupPage/SignupPage';

function AuthRoute(props) {
    return (
        <>
            <Routes>
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </>

    );
}

export default AuthRoute;