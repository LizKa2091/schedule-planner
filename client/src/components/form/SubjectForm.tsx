import { type FC } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';

import { addSubjectSchema } from '@/schemas/schedule';
import { type SubjectFormData } from '@/types/formDataTypes';
import { useZodForm } from '@/hooks/useZodForm';
import { useScheduleStore } from '@/store/scheduleStore';

const SubjectForm: FC = () => {
   const { teachers } = useScheduleStore();

   const { onFinish, formErrors } = useZodForm<SubjectFormData>({
      schemaAction: addSubjectSchema,
      entityName: 'subjects'
   });

   return (
      <Form onFinish={onFinish} action='#'>
         <Form.Item 
            label='Название предмета' 
            name='name' 
            validateStatus={formErrors.name ? 'error' : ''}
            help={formErrors.name}
            required
         >
            <Input />
         </Form.Item>
         <Form.Item 
            label='Количество часов в неделю' 
            name='hoursPerWeek'
            validateStatus={formErrors.hoursPerWeek ? 'error' : ''}
            help={formErrors.hoursPerWeek}
            initialValue={1}
            required
         >
            <InputNumber min={1} max={200} />
         </Form.Item>
         <Form.Item 
            label='Преподаватели для предмета' 
            name='teacherIds' 
            validateStatus={formErrors.teacherIds ? 'error' : ''}
            help={formErrors.teacherIds}
            required
         >
            <Select mode='multiple' fieldNames={{ value: 'id', label: 'label' }} options={teachers} />
         </Form.Item>
         <Button type='primary' htmlType='submit'>Добавить</Button>
      </Form>
   )
}

export default SubjectForm;