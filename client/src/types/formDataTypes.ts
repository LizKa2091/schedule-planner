import type { Dayjs } from "dayjs";
import type { IGroupData, IRoomData, IScheduleSlot, ISubjectData, ITeacherData } from "../store/scheduleTypes";

export type GroupFormData = Omit<IGroupData, 'id'>;

export type RoomFormData = Omit<IRoomData, 'id'>;

export type SubjectFormData = Omit<ISubjectData, 'id'>;

export type TeacherFormData = Omit<ITeacherData, 'id'>;

export type ScheduleFormData = Omit<IScheduleSlot, 'id'>;

export type ScheduleFormValues = Omit<ScheduleFormData, 'startTime' | 'dueToTime'> & {
   startTime?: string | Dayjs;
   dueToTime?: string | Dayjs;
};