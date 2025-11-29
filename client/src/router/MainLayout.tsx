import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import HeaderBar from '@/components/header-bar/HeaderBar';

import styles from './MainLayout.module.scss';

const MainLayout: FC = () => {
   return (
      <Layout>
         <HeaderBar />
         <Content className={styles.content}>
            <Outlet />
         </Content>
      </Layout>
   )
}

export default MainLayout;