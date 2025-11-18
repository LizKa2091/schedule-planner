export interface IScheduleData {
   id: string,
   value: number | string,
   label: string
}

export interface IScheduleSlot {
   id: string;
}

export type EntityType = "groups" | "teachers" | "rooms" | "subjects" | "scheduleSlots";