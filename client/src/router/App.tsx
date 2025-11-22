import { type FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import ManagePage from '@/pages/ManagePage';

import '@/styles/global.scss';

const App: FC = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/manage' element={<ManagePage />} />
         </Routes>
      </BrowserRouter>
   )
}

export default App;