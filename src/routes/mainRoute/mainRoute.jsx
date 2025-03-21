import React from 'react';
import Header from '../../components/common/Header/Header';
import MainLeftlayout from '../../components/common/MainLeftlayout/MainLeftlayout';
import MainRightLayout from '../../components/common/MainRightLayout/MainRightLayout';
import { Route, Routes } from 'react-router-dom';
import SigninUserBox from '../../components/common/UserBox/SigninUserBox/SigninUserBox';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import NoticePage from '../../pages/NoticePage/NoticePage';
import CommunityBoardPage from '../../pages/CommunityBoardPage/CommunityBoardPage';
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute';
import PostDetailPage from '../../pages/PostDetailPage/PostDetailPage';
import SideMenuBox from '../../components/common/SideMenuBox/SideMenuBox';

function MainRoute() {

    return(
        <>
            <Header />
            <MainContainer>
                <MainLeftlayout>
                    {/* 유저 박스 여기 위치 */}
                    <SigninUserBox /> 로그인 유저 박스
                    {/* <MainUserBox /> */}
                    <SideMenuBox />
                </MainLeftlayout>

                <MainRightLayout>
                    <Routes>
                        <Route path="/" element={<></>} />
                        <Route path="/notice" element={<NoticePage />} />
                        <Route path="/notice/:postId" element={<PostDetailPage />} />
                        <Route path="/communityBoard" element={<CommunityBoardPage />} />
                        <Route path="/communityBoard/:postId" element={<PostDetailPage />} />
                        <Route path="/service/*" element={<AuthenticatedRoute />} />
                        <Route path="/*" element={<>찾을 수 없는 페이지입니다.</>} />
                    </Routes>
                </MainRightLayout>
            </MainContainer>
        
        </>
        
    );
}

export default MainRoute;
