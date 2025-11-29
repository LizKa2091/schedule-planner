import { type FC, type ReactNode } from 'react';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

import HeaderBar from '@/components/header-bar/HeaderBar';

import styles from './MainLayout.module.scss';

interface IMainLayoutProps {
   children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
   return (
      <Layout>
         <HeaderBar />
         <Content className={styles.content}>
            {children}
         </Content>
      </Layout>
   )
}

export default MainLayout;