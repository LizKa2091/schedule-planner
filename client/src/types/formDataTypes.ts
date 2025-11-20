import type { IGroupData, IRoomData } from "../store/scheduleTypes";

export type GroupFormData = Omit<IGroupData, 'id'>;

export type RoomFormData = Omit<IRoomData, 'id'>;