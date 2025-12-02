import { useMemo } from "react";
import { type Dayjs } from "dayjs";

import { useScheduleStore } from "@/store/scheduleStore";
import type { IFilterData } from "@/types/filters";
import { dayMap } from "@/constants/dayMap";

interface IUseLessonsForGridParams {
   filters: IFilterData;
   currWeek: Dayjs;
}

export const useLessonsForGrid = ({ filters, currWeek }: IUseLessonsForGridParams) => {
  const { scheduleSlots } = useScheduleStore();

  return useMemo(() => {
    return scheduleSlots
      .filter((slot) => {
        if (filters.group && slot.groupId !== filters.group) return false;
        if (filters.subject && slot.subjectId !== filters.subject) return false;
        if (filters.room && slot.roomId !== filters.room) return false;

        return true;
      })
      .map((slot) => {
        const dayIndex = dayMap[slot.day];

        const date = currWeek.add(dayIndex, "day");

        const [sh, sm] = slot.startTime.split(":").map(Number);
        const [eh, em] = slot.dueToTime.split(":").map(Number);
        
        return {
          id: slot.id,
          group: slot.groupId,
          subject: slot.subjectId,
          room: slot.roomId,
          start: date.hour(sh).minute(sm),
          end: date.hour(eh).minute(em),
        };
      });
  }, [scheduleSlots, filters, currWeek]);
};