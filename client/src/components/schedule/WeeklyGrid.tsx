import { type FC } from 'react';
import { Flex } from 'antd';
import type { Dayjs } from 'dayjs';

import { useLessonsForGrid } from '@/hooks/useLessonsGrid';
import { usePositionedLessons } from '@/hooks/usePositionedLessons';
import { hours } from '@/constants/hours';
import type { IFilterData } from '@/types/filters';

import styles from './WeeklyGrid.module.scss';

interface IWeeklyGridProps {
   filters: IFilterData;
   currWeek: Dayjs;
}

const WeeklyGrid: FC<IWeeklyGridProps> = ({ filters, currWeek }) => {
   const weekDays = Array.from({ length: 7 }).map((_, i) => currWeek.add(i, 'day'));

   const gridLessons = useLessonsForGrid({ filters, currWeek });
   const positionedLessons = usePositionedLessons({ gridLessons })

   return (
      <Flex vertical className={styles.mainContainer}>
         <Flex className={styles.calendarGrid}>
            {hours.map((hour) => (
               <Flex key={hour} className={styles.hourLabel}>
                  {hour}:00
               </Flex>
            ))}

            {weekDays.map((_, dayIndex) =>
               hours.map((_, rowIndex) => (
                  <div
                     key={dayIndex + rowIndex}
                     className={styles.calendarCell}
                     style={{
                        gridColumn: dayIndex + 2,
                        gridRow: rowIndex + 1,
                     }}
                  />
               ))
            )}
         </Flex>
         {positionedLessons.map((lesson) => (
            <Flex vertical
               key={lesson.id}
               className={styles.lessonBlock}
               style={{
                  gridColumn: lesson.dayIndex + 2,
                  top: lesson.top,
                  height: lesson.height,
               }}
            >
               <p className={styles.lessonTitle}>{lesson.subject}</p> <br />
               {lesson.start.format("HH:mm")} - {lesson.end.format("HH:mm")} <br />
               {lesson.group}
            </Flex>
         ))}
      </Flex>
   )
}

export default WeeklyGrid;