import React from 'react';
import Header from '../../components/common/Header/Header';
import MainLeftlayout from '../../components/common/MainLeftlayout/MainLeftlayout';

import MainRightLayout from '../../components/common/MainRightLayout/MainRightLayout';
import SideMenuBox from '../../components/common/SIdeMenuBox/SIdeMenuBox';
import { Route, Routes } from 'react-router-dom';
import SigninUserBox from '../../components/common/UserBox/SigninUserBox/SigninUserBox';
import MentoringPage from '../../pages/MentoringPage/MentoringPage';
import MyPage from '../../pages/MyPage/MyPage';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import PurchaseSectionPage from '../../pages/PurchaseSectionPage/PurchaseSectionPage';
import BoardRegistPage from '../../pages/BoardRegistPage/BoardRegistPage';

export default function MainRoute({}) {
    return (
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
                        <Route path="/mypage" element={<MyPage />} />
                        <Route path="/mentoring" element={<MentoringPage />} />
                        <Route
                            path="/purchaseSection"
                            element={<PurchaseSectionPage />}
                        />
                        <Route
                            path="/:boardName/regist"
                            element={<BoardRegistPage />}
                        />
                    </Routes>
                </MainRightLayout>
            </MainContainer>
        </>
    );
}
