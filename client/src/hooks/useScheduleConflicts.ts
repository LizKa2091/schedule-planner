import { useScheduleStore } from "@/store/scheduleStore";
import type { ScheduleFormData } from "@/types/formDataTypes";

interface ConflictResult {
   hasConflict: boolean;
   message: string;
}

export const useScheduleConflicts = () => {
   const { scheduleSlots, groups, teachers, rooms } = useScheduleStore();

   const checkConflicts = (newSlot: ScheduleFormData): ConflictResult => {
      const sameDaySlots = scheduleSlots.filter((slot) => slot.day === newSlot.day);

      const isOverlap = (
         startA: string,
         endA: string,
         startB: string,
         endB: string
      ) => startA < endB && startB < endA;

      for (const slot of sameDaySlots) {
         const overlap = isOverlap(
            newSlot.startTime,
            newSlot.dueToTime,
            slot.startTime,
            slot.dueToTime
         );

         if (!overlap) continue;

         if (slot.groupId === newSlot.groupId) {
            const conflictGroup = groups.find((group) => group.id === newSlot.groupId)?.label ?? 'выбранной';

            return {
               hasConflict: true,
               message: `Ошибка: у ${conflictGroup} группы уже есть занятие в это время`,
            };
         }

         if (slot.teacherId === newSlot.teacherId) {
            const conflictTeacher = teachers.find((teacher) => teacher.id === newSlot.teacherId)?.label ?? 'выбранный';

            return {
               hasConflict: true,
               message: `Ошибка: ${conflictTeacher} преподаватель занят в это время`,
            };
         }

         if (slot.roomId === newSlot.roomId) {
            const conflictRoom = rooms.find((room) => room.id === newSlot.roomId)?.name ?? 'выбранная';

            return {
               hasConflict: true,
               message: `${conflictRoom} аудитория уже занята`,
            };
         }

      }
      return { hasConflict: false, message: '' };
   };

   return { checkConflicts };
};