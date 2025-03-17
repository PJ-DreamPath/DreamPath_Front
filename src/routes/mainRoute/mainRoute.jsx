import React from 'react';
import Header from '../../components/common/Header/Header';
import MainLeftlayout from '../../components/common/MainLeftlayout/MainLeftlayout';
import SideMenuBox from '../../components/common/SIdeMenuBox/SIdeMenuBox';
import { Route, Routes } from 'react-router-dom';
import SigninUserBox from '../../components/common/UserBox/SigninUserBox/SigninUserBox';

export default function MainRoute({}) {
  return (
    <>
      <Header />

      <MainLeftlayout>
        {/* 유저 박스 여기 위치 */}
        <SigninUserBox />
        <SideMenuBox />
      </MainLeftlayout>

      {/* 푸터 여기 위치 */}
    </>
  );
}
