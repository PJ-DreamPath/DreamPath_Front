import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
                <Route path="/mypage/point/purchase" element={<PointPurchasePage />} />
                <Route path="/mentoring" element={<MentoringPage />} />
                <Route path="/purchaseSection" element={<PurchaseSectionPage />} />
                <Route path="/:boardName/regist" element={<BoardRegistPage />} />
                <Route path="/admin/users" element={<AdminUserSearchPage />} />
            </Routes>
          }  
        </>
    );
}

export default AuthenticatedRoute;