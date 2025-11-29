import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';

import { menuItems } from '@/constants/menuItems';

import styles from './HeaderBar.module.scss';

const HeaderBar: FC = () => {
   const navigate = useNavigate();

   const handleItemClick = ({ key }: { key: string }) => {
      const currItem = menuItems.find((item) => item.key === +key);

      if (currItem?.path) navigate(currItem.path);
   }

   return (
      <Header className={styles.header}>
         <Flex align='center' gap={50}>
            <h1 className={styles.headerTitle}>Schedule planner</h1>
            <Menu 
               mode='horizontal' 
               items={menuItems} 
               onClick={handleItemClick}
            />
         </Flex>
      </Header>
   )
}

export default HeaderBar;