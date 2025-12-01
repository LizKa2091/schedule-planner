import { type FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from './MainLayout';
import HomePage from '@/pages/HomePage';
import ManagePage from '@/pages/ManagePage';
import SchedulePage from '@/pages/SchedulePage';

import '@/styles/global.scss';

const App: FC = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<MainLayout />}>
               <Route path='/' element={<HomePage />} />
               <Route path='/manage' element={<ManagePage />} />
               <Route path='/schedule' element={<SchedulePage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default App;