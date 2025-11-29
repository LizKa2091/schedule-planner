import { type FC } from 'react';
import { Card, Flex } from 'antd';

import { useNearestLessons } from './useNearestLessons';

const NearestLesson: FC = () => {
   const incomingLessons = useNearestLessons();

   if (!incomingLessons.length) {
      return <p>Занятий не найдено</p>;
   }

   return (
      <Flex gap='large'>
         {incomingLessons.map((lesson) => (
            <Card key={lesson.id}>
               <p><b>Начало:</b> {lesson.nextDate.format("D MMMM YYYY, HH:mm")}</p>
               <p><b>Группа:</b> {lesson.group?.label}</p>
               <p><b>Предмет:</b> {lesson.subject?.name}</p>
               <p><b>Аудитория:</b> {lesson.room?.name}</p>
            </Card>
         ))}
      </Flex>
   )
}

export default NearestLesson;