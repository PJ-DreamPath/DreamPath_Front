import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SignupPage from '../../pages/signupPage/SignupPage';
import { useQueryClient } from '@tanstack/react-query';
import OAuth2LoginPage from '../../pages/OAuth2LoginPage/OAuth2LoginPage';

function AuthRoute(props) {


    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();
    const queryState = queryClient.getQueryState(["userMeQuery"]);
    
    
    useEffect(() => {
        if (queryState.status === "success") {
            navigate("/home");
        }
    }, [queryState, location]);

    return (
        <>  
            {
                queryState.status === "error" &&
                <Routes>
                    <Route path='/login/oauth2' element={<OAuth2LoginPage />}></Route>
                    <Route path="/signup" element={<SignupPage />} />
                    
                </Routes>

            }
        </>
    );
}

export default AuthRoute;