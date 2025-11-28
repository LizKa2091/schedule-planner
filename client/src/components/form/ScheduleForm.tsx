import { type FC } from 'react';
import { Button, Form, Select, TimePicker } from 'antd';

import { addScheduleBlockSchema } from '@/schemas/schedule';
import { useScheduleStore } from '@/store/scheduleStore';
import { useScheduleForm } from '@/hooks/useScheduleForm';
import type { ScheduleFormData } from '@/types/formDataTypes';
import { weekDays } from '@/types/constants';

const ScheduleForm: FC = () => {
   const { groups, subjects, teachers, rooms } = useScheduleStore();

   const { onFinish, formErrors } = useScheduleForm({
      schemaAction: addScheduleBlockSchema,
      preconvertate: (formData) => ({
         ...formData,
         startTime: typeof formData.startTime === 'string'
            ? formData.startTime
            : formData.startTime?.format('HH:mm:ss') ?? '',

         dueToTime: typeof formData.dueToTime === 'string'
            ? formData.dueToTime
            : formData.dueToTime?.format('HH:mm:ss') ?? '',
      }) as ScheduleFormData
   });

   return (
      <Form onFinish={onFinish} action='#'>
         <Form.Item 
            label='Группа' 
            name='groupId' 
            validateStatus={formErrors.groupId ? 'error' : ''}
            help={formErrors.groupId}
            required
         >
            <Select 
               fieldNames={{ value: 'id', label: 'label' }}
               options={groups} 
            />
         </Form.Item>
         <Form.Item 
            label='Предмет' 
            name='subjectId'
            validateStatus={formErrors.subjectId ? 'error' : ''}
            help={formErrors.subjectId}
            required
         >
            <Select 
               fieldNames={{ value: 'id', label: 'name' }}
               options={subjects} 
            />
         </Form.Item>
         <Form.Item 
            label='Преподаватель' 
            name='teacherId'
            validateStatus={formErrors.teacherId ? 'error' : ''}
            help={formErrors.teacherId}
            required
         >
            <Select 
               fieldNames={{ value: 'id', label: 'label' }}
               options={teachers} 
            />
         </Form.Item>
         <Form.Item 
            label='Аудитория' 
            name='roomId'
            validateStatus={formErrors.roomId ? 'error' : ''}
            help={formErrors.roomId}
            required
         >
            <Select 
               fieldNames={{ value: 'id', label: 'name' }}
               options={rooms} 
            />
         </Form.Item>
         <Form.Item
            label='День недели'
            name='day'
            validateStatus={formErrors.day ? 'error' : ''}
            help={formErrors.day}
            required
         >
            <Select options={weekDays} />
         </Form.Item>
         <Form.Item
            label='Время начала'
            name='startTime'
            validateStatus={formErrors.startTime ? 'error' : ''}
            help={formErrors.startTime}
            required
         >
            <TimePicker format='HH:mm:ss' />
         </Form.Item>
         <Form.Item
            label='Время окончания'
            name='dueToTime'
            validateStatus={formErrors.dueToTime ? 'error' : ''}
            help={formErrors.dueToTime}
            required
         >
            <TimePicker format='HH:mm:ss' />
         </Form.Item>
         <Button type='primary' htmlType='submit'>Добавить</Button>
      </Form>
   )
}

export default ScheduleForm;