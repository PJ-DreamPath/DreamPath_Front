import React, { useEffect } from 'react';
import Header from '../../components/common/Header/Header';
import SigninUserBox from '../../components/common/UserBox/SigninUserBox/SigninUserBox';
import TopContainer from '../../components/common/TopContainer/TopContainer';
import TopLeftLayout from '../../components/common/TopLeftLayout/TopLeftLayout';
import TopRightLayout from '../../components/common/TopRightLayout/TopRightLayout';
import BottomContainer from '../../components/common/BottomContainer/BottomContainer';
import HomePostList from '../../components/HomePostList/HomePostList';
import { useSetRecoilState } from 'recoil';
import { useGetAdminUsers } from '../../queries/adminQuery';
import { userTotalCountAtom } from '../../atoms/userTotalAtom';

function HomeRoute(props) {
  
    

    return (
        <div>
            <Header />
            <TopContainer>
                <TopLeftLayout>
                    {/* 유저 박스 여기 위치 */}
                    <SigninUserBox /> 
                    {/* <MainUserBox /> */}
                </TopLeftLayout>

                <TopRightLayout>
                    <HomePostList />
                </TopRightLayout>
            </TopContainer>
            <BottomContainer/>
        </div>
    );
}

export default HomeRoute;