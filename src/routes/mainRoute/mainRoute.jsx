import React from 'react';
import Header from '../../components/common/Header/Header';
import MainLeftlayout from '../../components/common/MainLeftlayout/MainLeftlayout';

import MainRightLayout from '../../components/common/MainRightLayout/MainRightLayout';
import SideMenuBox from '../../components/common/SIdeMenuBox/SIdeMenuBox';
import { Route, Routes } from 'react-router-dom';
import SigninUserBox from '../../components/common/UserBox/SigninUserBox/SigninUserBox';
import Footer from '../../components/common/Footer/Footer';
import MainUserBox from '../../components/common/UserBox/MainUserBox/MainUserBox';
import MentoringPage from '../../pages/MentoringPage/MentoringPage';
import MyPage from '../../pages/MyPage/MyPage';
import MainContainer from '../../components/common/MainContainer/MainContainer';
import PurchaseSectionPage from '../../pages/PurchaseSectionPage/PurchaseSectionPage';

export default function MainRoute({ }) {
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
            <Route path="/purchaseSection" element={<PurchaseSectionPage />} />    
          </Routes>
        </MainRightLayout>

      </MainContainer>
    </>
  );
}
