import { Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';
import { global } from './styles/global';
import Mainlayout from './components/common/Mainlayout/Mainlayout';
import MainRoute from './routes/mainRoute/mainRoute';
import Footer from './components/common/Footer/Footer';
import {
    useGetMentoringApplyHistoryQuery,
    useUserMeQuery,
} from './queries/userQuery';
import HomeRoute from './routes/HomeRoute.jsx/HomeRoute';
import AuthRoute from './routes/authRoute/AuthRoute';
import { useGetAdminUsers } from './queries/adminQuery';

function App() {
    const user = useUserMeQuery();
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
            <Global styles={global} />

            <Mainlayout>
                <Routes>
                    <Route path="/auth/*" element={<AuthRoute />} />
                    <Route path="/home" element={<HomeRoute />} />
                    <Route path="/*" element={<MainRoute />} />
                </Routes>
                <Footer />
            </Mainlayout>
        </>
    );
}

export default App;
