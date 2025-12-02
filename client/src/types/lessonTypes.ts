import type { Dayjs } from "dayjs";

export interface ILessonData {
   id: string;
   subject: string;
   group: string;
   room: string;
   start: Dayjs;
   end: Dayjs;
}