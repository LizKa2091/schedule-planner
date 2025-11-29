import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import NearestLesson from '@/components/nearest-lesson/NearestLesson';

dayjs.locale('ru');

const HomePage: FC = () => {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate('/manage');
   }

   return (
      <Flex vertical align='center' gap='large'>
         <h1>Добрый день!</h1>
         <h2>Сегодня {dayjs().format('D MMMM YYYY года')}</h2>
         <Flex vertical align='center' justify='center' gap='middle'>
            <h3>Ближайшие занятия: </h3>
            <NearestLesson />
         </Flex>
         <Button type='primary' onClick={handleClick}>Перейти к управлению расписанием</Button>
      </Flex>
   )
}

export default HomePage;