import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IScheduleData, EntityType, IGroupData, IRoomData } from './scheduleTypes';

const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2);

interface IScheduleState {
   groups: IGroupData[];
   teachers: IScheduleData[];
   rooms: IRoomData[];
   subjects: IScheduleData[];
   scheduleSlots: IScheduleData[];
   addEntry: (type: EntityType, value: Omit<IScheduleData | IGroupData | IRoomData, 'id'>) => void;
   removeEntry: (type: EntityType, id: string) => void;
   editEntry: (type: EntityType, id: string, value: string | number) => void;
}

export const useScheduleStore = create<IScheduleState>()(persist((set) => ({
   groups: [],
   teachers: [],
   rooms: [],
   subjects: [],
   scheduleSlots: [],
   addEntry: (type: EntityType, value: Omit<IScheduleData | IGroupData | IRoomData, 'id'>) => 
      set((state) => ({ [type]: [...state[type], { ...value, id: generateId() }] })),
   removeEntry: (type: EntityType, id: string) => 
      set((state) => ({ [type]: state[type].filter((entity) => entity.id !== id) })),
   editEntry: (type: EntityType, id: string, value: string | number) => 
      set((state) => ({ [type]: state[type].map((entity) => entity.id === id ? { ...entity, value } : entity) }))
}), 
   { name: 'schedule' }
));