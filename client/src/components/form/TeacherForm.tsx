import { type FC } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';

import { addTeacherSchema } from '@/schemas/schedule';
import { type TeacherFormData } from '@/types/formDataTypes';
import { useZodForm } from '@/hooks/useZodForm';

const TeacherForm: FC = () => {
   const { onFinish, formErrors } = useZodForm<TeacherFormData>({ 
      schemaAction: addTeacherSchema,
      entityName: 'teachers'
   });

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
            required
         >
            <Input type='tel' />
         </Form.Item>
         <Form.Item 
            label='Максимальное количество часов в неделю' 
            name='maxHoursPerWeek'
            validateStatus={formErrors.maxHoursPerWeek ? 'error' : ''}
            help={formErrors.maxHoursPerWeek}
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