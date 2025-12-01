import { type FC } from 'react'
import { Button, Flex, Select } from 'antd';
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';

import { useScheduleStore } from '@/store/scheduleStore';
import type { IFilterData } from '@/types/filters';
import type { Dayjs } from 'dayjs';

interface ISchedulePanelProps {
   filters: IFilterData;
   setFilters: (value: IFilterData) => void;
   currWeek: Dayjs;
   onNextWeek: () => void;
   onPrevWeek: () => void;
   onTodayWeek: () => void;
}

const SchedulePanel: FC<ISchedulePanelProps> = ({ 
   filters, setFilters, currWeek, onNextWeek, onPrevWeek, onTodayWeek
}) => {
   const { groups, subjects, rooms } = useScheduleStore();

   return (
      <Flex justify='center' align='center' vertical gap='large'>
         <Flex justify='space-between' align='center' gap='large'>
            <Flex gap='small'>
               <Button icon={<CaretLeftFilled />} onClick={onPrevWeek} />
               <h2>
                  Неделя: {currWeek.format('D MMMM')} - {currWeek.add(6, 'day').format('D MMMM YYYY')}
               </h2>
               <Button icon={<CaretRightFilled />} onClick={onNextWeek} />
            </Flex>
            <Button onClick={onTodayWeek}>Сегодня</Button>
         </Flex>

         <Flex gap='middle'>
            <Select 
               placeholder='Группа'
               value={filters.group}
               onChange={(value) => setFilters({ ...filters, group: value })}
               options={groups.map((group) => ({ label: group.label, value: group.id }))}
            />
            <Select 
               placeholder='Предмет'
               value={filters.subject}
               onChange={(value) => setFilters({ ...filters, subject: value })}
               options={subjects.map((subject) => ({ label: subject.name, value: subject.id }))}
            />
            <Select 
               placeholder='Аудитория'
               value={filters.room}
               onChange={(value) => setFilters({ ...filters, room: value })}
               options={rooms.map((room) => ({ label: room.name, value: room.id }))}
            />
            <Button type='primary'>Добавить занятие</Button>
         </Flex>
      </Flex>
   )
}

export default SchedulePanel;