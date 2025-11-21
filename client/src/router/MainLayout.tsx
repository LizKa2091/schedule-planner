import { type FC, type ReactNode } from 'react';
import { Flex } from 'antd';

interface IMainLayoutProps {
   children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
   return (
      <Flex justify='center' align='center' gap='middle'>
         {children}
      </Flex>
   )
}

export default MainLayout;