import { Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';
import { global } from './styles/global';
import Mainlayout from './components/common/Mainlayout/Mainlayout';
import MainRoute from './routes/mainRoute/mainRoute';
import AuthRoute from './routes/authRoute/authRoute';
import Footer from './components/common/Footer/Footer';
import { useUserMeQuery } from './queries/userQuery';

function App() {

  useUserMeQuery();
  return (
    <>
      <Global styles={global} />

      <Mainlayout>
        <Routes>
          <Route path="/auth/*" element={<AuthRoute />} />
          <Route path="/*" element={<MainRoute />} />
          
        </Routes>
        <Footer />
      </Mainlayout>
    </>
  );
}

export default App;
