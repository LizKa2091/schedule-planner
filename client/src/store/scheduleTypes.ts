interface IDefaultData {
   id: string;
   name: string;
}

export interface IGroupData extends IDefaultData {
   label: string;
   studentsCount: number;
}

export interface IRoomData extends IDefaultData {
   capacity: number;
   type: RoomType;
}

export interface ISubjectData extends IDefaultData {
   hoursPerWeek: number;
   teacherIds: string[];
   groupIds?: string[];
}

export interface ITeacherData extends IDefaultData {
   label: string;
   email: string;
   phone: string;
   maxHours: number;
}

export interface IScheduleSlot {
   id: string;
   groupdId: string;
   subjectId: string;
   teacherId: string;
   roomId: string;
   day: string;
   startTime: string;
   dueToTime: string;
}

export type EntityType = 'groups' | 'teachers' | 'rooms' | 'subjects' | 'scheduleSlots';
export type RoomType = 'lecture' | 'practice' | 'universal';