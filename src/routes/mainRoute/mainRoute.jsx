import React from 'react';
import Header from '../../components/common/Header/Header';
import MainLeftlayout from '../../components/common/MainLeftlayout/MainLeftlayout';
import SideMenuBox from '../../components/common/SIdeMenuBox/SIdeMenuBox';
import Footer from '../../components/common/Footer/Footer';

export default function MainRoute({}) {
  return (
    <>
      <Header />

      <MainLeftlayout>
        {/* 유저 박스 여기 위치 */}
        <SideMenuBox />
      </MainLeftlayout>

      {/* 푸터 여기 위치 */}
      <Footer/>
    </>
  );
}
