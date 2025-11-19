import { z } from "zod";

export const addGroupSchema = z.object({
   name: z.string().min(2, 'минимальная длина 2 символа').max(50, 'максимальная длина 50 символов'),
   label: z.string().min(2, 'минимальная длина 2 символа').max(50, 'максимальная длина 50 символов'),
   studentsCount: z.number()
});

export const addTeacherSchema = z.object({
   name: z.string().min(2, 'минимальная длина 2 символа').max(50, 'максимальная длина 50 символов'),
   label: z.string().min(2, 'минимальная длина 2 символа').max(50, 'максимальная длина 50 символов'),
   email: z.string().email(),
   phone: z.e164(),
   maxHoursPerWeek: z.number().min(1, 'минимальная длина 1 символ').max(2, 'максимальная длина 2 символа')
});

export const addSubjectSchema = z.object({
   name: z.string().min(2, 'минимальная длина 2 символа').max(25, 'максимальная длина 25 символов'),
   hoursPerWeek: z.number().min(1, 'минимальная длина 1 символ').max(3, 'максимальная длина 3 символа'),
   teacherIds: z.array(z.string()).min(1),
   groupIds: z.array(z.string()).min(1)
});

export const addRoomSchema = z.object({
   name: z.string().min(2, 'минимальная длина 2 символа').max(25, 'максимальная длина 25 символов'),
   capacity: z.number().min(1, 'минимальная длина 1 символ').max(3, 'максимальная длина 3 символа'),
   type: z.string()
})