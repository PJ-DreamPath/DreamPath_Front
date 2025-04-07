import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import PointPurchasePage from '../../pages/PointPurchasePage/PointPurchasePage';
import MentoringPage from '../../pages/MentoringPage/MentoringPage';
import PurchaseSectionPage from '../../pages/PurchaseSectionPage/PurchaseSectionPage';
import BoardRegistPage from '../../pages/BoardRegistPage/BoardRegistPage';
import AdminUserSearchPage from '../../pages/AdminUserSearchPage/AdminUserSearchPage';
import TicketPurchasePage from '../../pages/TicketPurchasePage/TicketPurchasePage';
import PostDetailPage from '../../pages/PostDetailPage/PostDetailPage';
import AdminPostSearchPage from '../../pages/AdminPostSearchPage copy/AdminPostSearchPage';
import MyPage from '../../pages/MyPage/MyPage';
import AdminPage from '../../pages/AdminPage/AdminPage';
import MyMentoring from '../../pages/MyMentoringPage/MyMentoring';
import MentoringApplyHistory from '../../pages/MentoringApplyHistory/MentoringApplyHistory';
import { useGetAdminUsers } from '../../queries/adminQuery';

function AuthenticatedRoute(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();
    const principalState = queryClient.getQueryState(['userMeQuery']);
    const apply = queryClient.getQueryData([
        'useGetMentoringApplyHistoryQuery',
    ]);
    useGetAdminUsers({
        page: 1,
        limitCount: 15,
});

    useEffect(() => {
        if (principalState.status === 'error') {
            alert('로그인 후 이용해주세요');
            navigate('/home');
        }
    }, [principalState.status]);





    return (
        <>
            {principalState.status === 'success' && (
                <Routes>
                    <Route path="/mypage" element={<MyPage />} />
                    <Route
                        path="/mypage/mymentoring"
                        element={<MyMentoring />}
                    />
                    <Route
                        path="/mypage/mentoringrequest"
                        element={<MentoringApplyHistory />}
                    />
                    <Route
                        path="/mypage/purchase"
                        element={<PurchaseSectionPage />}
                    />
                    <Route
                        path="/mypage/point/purchase"
                        element={<PointPurchasePage />}
                    />
                    <Route
                        path="/mypage/ticket/purchase"
                        element={<TicketPurchasePage />}
                    />
                    <Route
                        path="/:boardName/regist"
                        element={<BoardRegistPage />}
                    />
                    <Route
                        path="/:boardName/update/:postid"
                        element={<BoardRegistPage />}
                    />
                    <Route path="/mentoring" element={<MentoringPage />} />
                    <Route
                        path="/mentoring/:postid"
                        element={<PostDetailPage />}
                    />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route
                        path="/admin/users"
                        element={<AdminUserSearchPage />}
                    />
                    <Route
                        path="/admin/posts"
                        element={<AdminPostSearchPage />}
                    />
                </Routes>
            )}
        </>
    );
}

export default AuthenticatedRoute;
