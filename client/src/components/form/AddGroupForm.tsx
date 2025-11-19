import { type FC, useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

import { addGroupSchema } from '../../schemas/schedule';
import { useScheduleStore } from '../../store/scheduleStore';
import { ZodError } from 'zod';

interface IFormData {
   name: string;
   label: string;
   studentsCount: number;
}

const AddGroupForm: FC = () => {
   const { addEntry } = useScheduleStore();
   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

   const onFinish = (formData: IFormData) => {
      setFormErrors({});

      const finalFormData = { ...formData, label: formData.label?.trim() || formData.name }

      try {
         const data = addGroupSchema.parse(finalFormData);

         addEntry('groups', data)
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
            label='Название группы (системное)' 
            name='name' 
            validateStatus={formErrors.name ? 'error' : ''}
            help={formErrors.name}
            required
         >
            <Input />
         </Form.Item>
         <Form.Item 
            label='Название группы (отображаемое)' 
            name='label'
            validateStatus={formErrors.label ? 'error' : ''}
            help={formErrors.label}
         >
            <Input />
         </Form.Item>
         <Form.Item 
            label='Количество студентов' 
            name='studentsCount' 
            validateStatus={formErrors.studentsCount ? 'error' : ''}
            help={formErrors.studentsCount}
            required
         >
            <InputNumber />
         </Form.Item>
         <Button type='primary' htmlType='submit'>Добавить</Button>
      </Form>
   )
}

export default AddGroupForm;