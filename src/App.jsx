import { Route, Routes } from 'react-router-dom';
import { Global } from '@emotion/react';
import { global } from './styles/global';
import Mainlayout from './components/common/Mainlayout/Mainlayout';
import MainRoute from './routes/mainRoute/mainRoute';

function App() {
  return (
    <>
      <Global styles={global} />

      <Mainlayout>
        <Routes>
          <Route path="/*" element={<MainRoute />} />
        </Routes>
      </Mainlayout>
    </>
  );
}

export default App;
