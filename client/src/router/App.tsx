import { type FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ManagePage from '@/pages/ManagePage';

import '@/styles/global.scss';
import MainLayout from './MainLayout';

const App: FC = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<MainLayout />}>
               <Route path='/' element={<HomePage />} />
               <Route path='/manage' element={<ManagePage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default App;