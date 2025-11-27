import { useMemo } from "react";
import dayjs from "dayjs";
import { useScheduleStore } from "@/store/scheduleStore";
import type { IScheduleSlot } from "@/store/scheduleTypes";

interface ICheckConflictResult {
   hasConflict: boolean;
   conflictsType?: 'group' | 'teacher' | 'room';
   slot?: IScheduleSlot;
}

type EntitiesIds = {
   groupId: string;
   teacherId: string;
   roomId: string;
}

export const useScheduleConflicts = (
   day: string, 
   startTime: string, 
   dueToTime: string,
   ids: EntitiesIds
) => {
   const { scheduleSlots } = useScheduleStore();

   const newSlotStart = dayjs(startTime, 'HH:mm');
   const newSlotEnd = dayjs(dueToTime, 'HH:mm');

   const currDaySlots = useMemo(() => {
      return scheduleSlots.filter((slot) => slot.day === day)
   }, [scheduleSlots, day]);

   const checkConflict = (): ICheckConflictResult => {
      for (const slot of currDaySlots) {
         const slotStart = dayjs(slot.startTime, 'HH:mm');
         const slotEnd = dayjs(slot.dueToTime, 'HH:mm');

         const isIntersect = newSlotStart.isBefore(slotEnd) && newSlotEnd.isAfter(slotStart);

         if (!isIntersect) continue;

         if (slot.groupId === ids.groupId) {
            return { hasConflict: true, conflictsType: 'group', slot };
         }

         if (slot.teacherId === ids.teacherId) {
            return { hasConflict: true, conflictsType: 'teacher', slot };
         }

         if (slot.roomId === ids.roomId) {
            return { hasConflict: true, conflictsType: 'room', slot };
         }
      }

      return { hasConflict: false };
   }


   return { checkConflict };
}