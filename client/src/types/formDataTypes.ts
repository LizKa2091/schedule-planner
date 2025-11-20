import type { IGroupData, IRoomData, ISubjectData } from "../store/scheduleTypes";

export type GroupFormData = Omit<IGroupData, 'id'>;

export type RoomFormData = Omit<IRoomData, 'id'>;

export type SubjectFormData = Omit<ISubjectData, 'id'>;