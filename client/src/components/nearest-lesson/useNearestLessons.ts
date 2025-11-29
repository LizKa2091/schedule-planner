import { useMemo } from "react";
import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';

import { useScheduleStore } from "@/store/scheduleStore";
import { dayMap } from "@/constants/dayMap";

dayjs.extend(isoWeek);

export const useNearestLessons = () => {
   const { scheduleSlots, groups, teachers, subjects, rooms } = useScheduleStore();
   const today = dayjs();
   
   return useMemo(() => {
      return scheduleSlots
         .map(slot => {
            const weekDay = dayMap[slot.day];
            if (!weekDay) return null;

            let date = today.startOf('week').add(weekDay-1, 'day');

            const [h, m, s] = slot.startTime.split(':').map(Number);
            date = date.hour(h).minute(m).second(s);

            if (date.isBefore(today)) {
               date = date.add(1, 'week');
            }

            return {
               ...slot,
               nextDate: date,
               group: groups.find(g => g.id === slot.groupId),
               subject: subjects.find(s => s.id === slot.subjectId),
               teacher: teachers.find(t => t.id === slot.teacherId),
               room: rooms.find(r => r.id === slot.roomId),
            };
         })
         .filter((item): item is NonNullable<typeof item> => Boolean(item))
         .sort((a, b) => a!.nextDate.valueOf() - b!.nextDate.valueOf())
         .slice(0, 3);
   }, [scheduleSlots, groups, teachers, subjects, rooms, today]);
}