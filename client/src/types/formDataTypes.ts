import type { IGroupData, IRoomData, ISubjectData, ITeacherData } from "../store/scheduleTypes";

export type GroupFormData = Omit<IGroupData, 'id'>;

export type RoomFormData = Omit<IRoomData, 'id'>;

export type SubjectFormData = Omit<ISubjectData, 'id'>;

export type TeacherFormData = Omit<ITeacherData, 'id'>;