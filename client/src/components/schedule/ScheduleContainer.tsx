import { useState, type FC } from 'react';
import { Flex } from 'antd';
import dayjs from 'dayjs';

import SchedulePanel from '@/components/schedule/SchedulePanel';
import WeeklyGrid from './WeeklyGrid';
import type { IFilterData } from '@/types/filters';

const ScheduleContainer: FC = () => {
   const [currWeek, setCurrWeek] = useState(dayjs().startOf('week'));
   const [filters, setFilters] = useState<IFilterData>({ 
      group: null, subject: null, room: null 
   });

   const handleNextWeek = () => setCurrWeek((day) => day.add(1, 'week'));
   const handlePrevWeek = () => setCurrWeek((day) => day.subtract(1, 'week'));
   const handleTodayWeek = () => setCurrWeek(dayjs().startOf('week'));

   return (
      <Flex vertical gap='large'>
         <SchedulePanel
            filters={filters}
            setFilters={setFilters}
            currWeek={currWeek}
            onNextWeek={handleNextWeek}
            onPrevWeek={handlePrevWeek}
            onTodayWeek={handleTodayWeek}
         />
         <WeeklyGrid filters={filters} currWeek={currWeek} />
      </Flex>
   )
}

export default ScheduleContainer;