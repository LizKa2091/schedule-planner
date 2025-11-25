import { z } from "zod";

export const addGroupSchema = z.object({
   name: z.string('поле не может быть пустым').min(2, 'минимальная длина 2 символа').max(50, 'максимальная длина 50 символов'),
   label: z.string('поле не может быть пустым').min(2, 'минимальная длина 2 символа').max(50, 'максимальная длина 50 символов'),
   studentsCount: z.number('поле не может быть пустым').min(1, 'минимальное количество 1').max(99, 'максимальное количество 99')
});

export const addTeacherSchema = z.object({
   name: z.string('поле не может быть пустым').min(2, 'минимальная длина 2 символа').max(50, 'максимальная длина 50 символов'),
   label: z.string('поле не может быть пустым').min(2, 'минимальная длина 2 символа').max(50, 'максимальная длина 50 символов'),
   email: z.string('поле не может быть пустым').email(),
   phone: z.e164('требуемый формат: +79999999999'),
   maxHoursPerWeek: z.number('поле не может быть пустым').min(1, 'минимальное количество 1').max(99, 'максимальное количество 99')
});

export const addSubjectSchema = z.object({
   name: z.string('поле не может быть пустым').min(2, 'минимальная длина 2 символа').max(25, 'максимальная длина 25 символов'),
   hoursPerWeek: z.number('поле не может быть пустым').min(1, 'минимальное количество 1').max(99, 'максимальное количество 99'),
   teacherIds: z.array(z.string(), 'поле не может быть пустым').min(1)
});

export const addRoomSchema = z.object({
   name: z.string('поле не может быть пустым').min(2, 'минимальная длина 2 символа').max(25, 'максимальная длина 25 символов'),
   capacity: z.number('поле не может быть пустым').min(1, 'минимальное количество 1').max(500, 'максимальное количество 500'),
   type: z.string('поле не может быть пустым')
});

export const addScheduleBlockSchema = z.object({
   groupId: z.string('поле не может быть пустым').min(1),
   subjectId: z.string('поле не может быть пустым').min(1),
   teacherId: z.string('поле не может быть пустым').min(1),
   roomId: z.string('поле не может быть пустым').min(1),
   day: z.string('поле не может быть пустым').min(1),
   startTime: z.iso.datetime('поле не может быть пустым'),
   dueToTime: z.iso.datetime('поле не может быть пустым')
})