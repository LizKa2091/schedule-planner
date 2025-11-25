import { type FC } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

import { addGroupSchema } from '@/schemas/schedule';
import { useZodForm } from '@/hooks/useZodForm';
import { type GroupFormData } from '@/types/formDataTypes';

const GroupForm: FC = () => {
   const { onFinish, formErrors } = useZodForm<GroupFormData>({ 
      schemaAction: addGroupSchema,
      entityName: 'groups',
      preconvertate: (formData) => ({
         ...formData,
         label: formData.label?.trim() || formData.name
      })
   });

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
            <InputNumber min={1} max={35} />
         </Form.Item>
         <Button type='primary' htmlType='submit'>Добавить</Button>
      </Form>
   )
}

export default GroupForm;