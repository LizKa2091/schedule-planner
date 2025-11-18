import { z } from "zod";

export const addGroupSchema = z.object({
   name: z.string().min(2).max(50),
   label: z.string().min(2).max(50),
   studentsCount: z.number()
});

export const addTeacherSchema = z.object({
   name: z.string().min(2).max(50),
   label: z.string().min(2).max(50),
   email: z.string().email(),
   phone: z.e164(),
   maxHoursPerWeek: z.number().min(1).max(2)
});

export const addSubjectSchema = z.object({
   name: z.string().min(2).max(25),
   hoursPerWeek: z.number().min(1).max(3),
   teacherIds: z.array(z.string()).min(1),
   groupIds: z.array(z.string()).min(1)
});

export const addRoomSchema = z.object({
   name: z.string().min(2).max(25),
   capacity: z.number().min(1).max(3),
   type: z.string()
})