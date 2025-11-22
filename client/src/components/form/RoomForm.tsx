import { useState, type FC } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { ZodError } from 'zod';

import { addRoomSchema } from '@/schemas/schedule';
import { useScheduleStore } from '@/store/scheduleStore';
import { roomTypeOptions } from '@/types/constants';
import { type RoomFormData } from '@/types/formDataTypes';

const RoomForm: FC = () => {
   const { addEntry } = useScheduleStore();
   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

   const onFinish = (formData: RoomFormData) => {
      setFormErrors({});

      try {
         const data = addRoomSchema.parse(formData);

         addEntry('rooms', data);
      }
      catch (err) {
         if (!(err instanceof ZodError)) return;

         const errors: Record<string, string> = {};

         err.issues.forEach((issue) => {
            const field = issue.path[0] as string;
            if (!errors[field]) {
               errors[field] = issue.message;
            }
         });

         setFormErrors(errors);
      }
   }

   return (
      <Form onFinish={onFinish} action='#'>
         <Form.Item 
            label='Название аудитории' 
            name='name' 
            validateStatus={formErrors.name ? 'error' : ''}
            help={formErrors.name}
            required
         >
            <Input />
         </Form.Item>
         <Form.Item 
            label='Вместимость аудитории' 
            name='capacity'
            validateStatus={formErrors.capacity ? 'error' : ''}
            help={formErrors.capacity}
            initialValue={20}
            required
         >
            <InputNumber min={1} max={150} />
         </Form.Item>
         <Form.Item 
            label='Тип аудитории' 
            name='type' 
            validateStatus={formErrors.type ? 'error' : ''}
            help={formErrors.type}
            required
         >
            <Select options={roomTypeOptions} />
         </Form.Item>
         <Button type='primary' htmlType='submit'>Добавить</Button>
      </Form>
   )
}

export default RoomForm;