import { useMemo, type FC } from 'react';
import { Card, Flex, List } from 'antd';

import { useScheduleStore } from '@/store/scheduleStore';
import { formatSlot, weekdayName } from '@/utils/formatTime';

interface IGroupInfoPanelProps {
   groupId: string | null;
}

const GroupInfoPanel: FC<IGroupInfoPanelProps> = ({ groupId }) => {
   const { groups, teachers, rooms, subjects, scheduleSlots } = useScheduleStore();

   const currGroup = groups.find((group) => group.id === groupId) ?? null;

   const groupSubjects = useMemo(() => {
      if (!currGroup) return [];

      return subjects.filter((subject) => subject.groupIds?.includes(currGroup.id));
   }, [currGroup, subjects]);

   const takenSlots = useMemo(() => {
      if (!currGroup) return [];

      return scheduleSlots
         .filter((slot) => slot.groupId === currGroup.id)
         .map((slot) => ({
            ...slot,
            subjectName: subjects.find((subject) => subject.id === slot.subjectId)?.name ?? '-',
            teacherName: teachers.find((teacher) => teacher.id === slot.teacherId)?.name ?? '-',
            roomName: rooms.find((room) => room.id === slot.roomId)?.name ?? '-'
         }))
         .sort((a, b) => {
            if (a.day === b.day) return a.startTime.localeCompare(b.startTime);

            return a.day.localeCompare(b.day);
         })
   }, [currGroup, scheduleSlots, subjects, teachers, rooms]);

   if (!currGroup) {
      return <p>Выберите группу</p>
   }

   return (
      <Card title={<p>Группа: {currGroup.label || currGroup.name}</p>}>
         <List 
            header={<p>Текущие предметы:</p>}
            dataSource={groupSubjects}
            renderItem={(item) =>
               <List.Item key={item.id}>{item.name}</List.Item>
            }
            locale={{ emptyText: 'Нет предметов' }}
         />
         <List 
            header={<p>Уже занятые слоты:</p>}
            dataSource={takenSlots}
            renderItem={(slot) => (
               <List.Item key={slot.id}>
                  <Flex vertical>
                     <p>{weekdayName(slot.day)}</p>
                     <p>{formatSlot(slot.startTime, slot.dueToTime)}</p>
                     <p>Предмет: {slot.subjectName}</p>
                     <p>Преподаватель: {slot.teacherName}</p> 
                     <p>Аудитория: {slot.roomName}</p>
                  </Flex>
               </List.Item>
            )}
            locale={{ emptyText: 'Нет пар' }}
         />
      </Card>
   )
}

export default GroupInfoPanel;