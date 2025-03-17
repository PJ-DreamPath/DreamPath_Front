import React from 'react';
import Header from '../../components/common/Header/Header';
import MainLeftlayout from '../../components/common/MainLeftlayout/MainLeftlayout';
import SideMenuBox from '../../components/common/SIdeMenuBox/SIdeMenuBox';
import { Route, Routes } from 'react-router-dom';
import SigninUserBox from '../../components/common/UserBox/SigninUserBox/SigninUserBox';
import Footer from '../../components/common/Footer/Footer';
import MainUserBox from '../../components/common/UserBox/MainUserBox/MainUserBox';
import MentoringPage from '../../pages/MentoringPage/MentoringPage';

export default function MainRoute({}) {
    return (
        <>
            <Header />

            <MainLeftlayout>
                {/* 유저 박스 여기 위치 */}
                {/* <SigninUserBox /> 로그인 유저 박스 */}
                <MainUserBox />
                <SideMenuBox />
            </MainLeftlayout>

            <MentoringPage />
        </>
    );
}
