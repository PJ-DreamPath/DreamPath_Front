import React, { useEffect } from 'react';
import Header from '../../components/common/Header/Header';
import MainLeftlayout from '../../components/common/MainLeftlayout/MainLeftlayout';
import MainRightLayout from '../../components/common/MainRightLayout/MainRightLayout';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import SigninUserBox from '../../components/common/UserBox/SigninUserBox/SigninUserBox';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import NoticePage from '../../pages/NoticePage/NoticePage';
import CommunityBoardPage from '../../pages/CommunityBoardPage/CommunityBoardPage';
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute';
import PostDetailPage from '../../pages/PostDetailPage/PostDetailPage';
import SideMenuBox from '../../components/common/SideMenuBox/SideMenuBox';
import { useGetMentoringApplyHistoryQuery } from '../../queries/userQuery';
import { useGetAdminUsers } from '../../queries/adminQuery';

function MainRoute() {
    const navigate = useNavigate();
    const path = useParams();
    useEffect(() => {
        if (path['*'] === '') {
            navigate('/home');
        }
    }, [path]);

    useGetMentoringApplyHistoryQuery({
            page: 1,
            limitCount: 10,
            order: 'desc',
            searchText: '',
        });
    useGetAdminUsers({
            page: 1,
            limitCount: 15,
        });

    return (
        <>
            <Header />
            <MainContainer>
                <MainLeftlayout>
                    {/* 유저 박스 여기 위치 */}
                    <SigninUserBox />
                    {/* <MainUserBox /> */}
                    <SideMenuBox />
                </MainLeftlayout>

                <MainRightLayout>
                    <Routes>
                        <Route path="/notice" element={<NoticePage />} />
                        <Route
                            path="/notice/:postid"
                            element={<PostDetailPage />}
                        />
                        <Route
                            path="/communityboard"
                            element={<CommunityBoardPage />}
                        />
                        <Route
                            path="/communityboard/:postid"
                            element={<PostDetailPage />}
                        />
                        <Route
                            path="/service/*"
                            element={<AuthenticatedRoute />}
                        />
                        <Route
                            path="/*"
                            element={<>찾을 수 없는 페이지입니다.</>}
                        />
                    </Routes>
                </MainRightLayout>
            </MainContainer>
        </>
    );
}

export default MainRoute;
