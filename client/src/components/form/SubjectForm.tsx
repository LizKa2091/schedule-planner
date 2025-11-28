import { type FC } from 'react';
import { Button, Flex, Form, Input, InputNumber, Select } from 'antd';
import clsx from 'clsx';

import { addSubjectSchema } from '@/schemas/schedule';
import { type SubjectFormData } from '@/types/formDataTypes';
import { useZodForm } from '@/hooks/useZodForm';
import { useScheduleStore } from '@/store/scheduleStore';

import styles from './Form.module.scss';

const SubjectForm: FC = () => {
   const { teachers } = useScheduleStore();

   const { formErrors, isSuccess, onFinish } = useZodForm<SubjectFormData>({
      schemaAction: addSubjectSchema,
      entityName: 'subjects'
   });

   return (
      <Form onFinish={onFinish} action='#'>
         <Flex justify='center' vertical>
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
            {isSuccess && 
               <p className={clsx(styles.message, styles.successMessage)}>
                  Предмет успешно добавлен
               </p>
            }
         </Flex>
      </Form>
   )
}

export default SubjectForm;