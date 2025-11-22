import { useState, type FC } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import { ZodError } from 'zod';

import { addTeacherSchema } from '@/schemas/schedule';
import { useScheduleStore } from '@/store/scheduleStore';
import { type TeacherFormData } from '@/types/formDataTypes';

const TeacherForm: FC = () => {
   const { addEntry } = useScheduleStore();
   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

   const onFinish = (formData: TeacherFormData) => {
      setFormErrors({});

      try {
         const data = addTeacherSchema.parse(formData);

         addEntry('subjects', data);
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
            label='Имя преподавателя (системное)' 
            name='name' 
            validateStatus={formErrors.name ? 'error' : ''}
            help={formErrors.name}
            required
         >
            <Input />
         </Form.Item>
         <Form.Item 
            label='ФИО преподавателя (отображаемое)' 
            name='label' 
            validateStatus={formErrors.label ? 'error' : ''}
            help={formErrors.label}
            required
         >
            <Input />
         </Form.Item>
         <Form.Item 
            label='Email' 
            name='email' 
            validateStatus={formErrors.email ? 'error' : ''}
            help={formErrors.email}
            required
         >
            <Input type='email' />
         </Form.Item>
         <Form.Item 
            label='Номер телефона' 
            name='phone'
            validateStatus={formErrors.phone ? 'error' : ''}
            help={formErrors.phone}
            initialValue={1}
            required
         >
            <Input type='tel' />
         </Form.Item>
         <Form.Item 
            label='Максимальное количество часов в неделю' 
            name='maxHours'
            validateStatus={formErrors.maxHours ? 'error' : ''}
            help={formErrors.maxHours}
            initialValue={1}
            required
         >
            <InputNumber min={1} max={99} />
         </Form.Item>
         <Button type='primary' htmlType='submit'>Добавить</Button>
      </Form>
   )
}

export default TeacherForm;