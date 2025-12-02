import { useMemo } from "react";
import type { ILessonData } from "@/types/lessonTypes";

interface IUsePositionedLessonsParams {
   gridLessons: ILessonData[];
}

export const usePositionedLessons = ({ gridLessons } : IUsePositionedLessonsParams) => {
   return useMemo(() => {
      return gridLessons.map((lesson) => {
         const start = lesson.start;
         const end = lesson.end;

         const dayIndex = start.day() === 0 ? 6 : start.day() - 1;

         const startHour = start.hour() + start.minute() / 60;
         const endHour = end.hour() + end.minute() / 60;

         return {
           ...lesson,
           dayIndex,
           top: startHour * 80,
           height: (endHour - startHour) * 80,
         };
     });
   }, [gridLessons])
};