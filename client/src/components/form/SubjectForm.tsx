import { useState, type FC } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { ZodError } from 'zod';

import { addSubjectSchema } from '../../schemas/schedule';
import { useScheduleStore } from '../../store/scheduleStore';
import { type SubjectFormData } from '../../types/formDataTypes';

const SubjectForm: FC = () => {
   const { addEntry } = useScheduleStore();
   const [formErrors, setFormErrors] = useState<Record<string, string>>({});

   const onFinish = (formData: SubjectFormData) => {
      setFormErrors({});

      try {
         const data = addSubjectSchema.parse(formData);

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
            label='Преподаватели для аудитории' 
            name='teacherIds' 
            validateStatus={formErrors.teacherIds ? 'error' : ''}
            help={formErrors.teacherIds}
            required
         >
            <Select options={[]} />
         </Form.Item>
         <Button type='primary' htmlType='submit'>Добавить</Button>
      </Form>
   )
}

export default SubjectForm;