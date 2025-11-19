export interface IScheduleData {
   id: string,
   value: number | string,
   label: string
}

export interface IGroupData {
   id: string;
   name: string;
   label: string;
   studentsCount: number;
}

export interface IScheduleSlot {
   id: string;
}

export type EntityType = "groups" | "teachers" | "rooms" | "subjects" | "scheduleSlots";