import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PointPurchasePage from '../../pages/PointPurchasePage/PointPurchasePage';
import MyPage from '../../pages/MyPage/MyPage';
import MentoringPage from '../../pages/MentoringPage/MentoringPage';
import PurchaseSectionPage from '../../pages/PurchaseSectionPage/PurchaseSectionPage';
import BoardRegistPage from '../../pages/BoardRegistPage/BoardRegistPage';
import AdminUserSearchPage from '../../pages/AdminUserSearchPage/AdminUserSearchPage';
import MentoringDetailPage from '../../pages/MentoringDetailPage/MentoringDetailPage';
import TicketPurchasePage from '../../pages/TicketPurchasePage/TicketPurchasePage';

function AuthenticatedRoute(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(["userMeQuery"]);

    useEffect(() => {
        console.log(principalState)
        if(principalState.status === "error") {
            alert("로그인 후 이용해주세요.");
            navigate("/")
        }
    }, [principalState.status]);

    return (
        <>
          {
            principalState.status === "success" &&
            <Routes>
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/mypage/purchase" element={<PurchaseSectionPage />} />
                <Route path="/mypage/point/purchase" element={<PointPurchasePage />} />
                <Route path="/mypage/ticket/purchase" element={<TicketPurchasePage />} />
                <Route path="/:boardName/regist" element={<BoardRegistPage />} />
                <Route path="/:boardName/update" element={<></>} /> 
                <Route path="/mentoring" element={<MentoringPage />} />
                <Route path="/mentoring/:postId" element={<MentoringDetailPage />} />
                <Route path="/admin/users" element={<AdminUserSearchPage />} />
            </Routes>
          }  
        </>
    );
}

export default AuthenticatedRoute;
