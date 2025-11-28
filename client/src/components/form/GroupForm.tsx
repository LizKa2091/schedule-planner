import { type FC } from 'react';
import { Button, Flex, Form, Input, InputNumber } from 'antd';
import clsx from 'clsx';

import { addGroupSchema } from '@/schemas/schedule';
import { useZodForm } from '@/hooks/useZodForm';
import { type GroupFormData } from '@/types/formDataTypes';

import styles from './Form.module.scss';

const GroupForm: FC = () => {
   const { formErrors, isSuccess, onFinish } = useZodForm<GroupFormData>({ 
      schemaAction: addGroupSchema,
      entityName: 'groups',
      preconvertate: (formData) => ({
         ...formData,
         label: formData.label?.trim() || formData.name
      })
   });

   return (
      <Form onFinish={onFinish} action='#'>
         <Flex justify='center' vertical>
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
            {isSuccess && 
               <p className={clsx(styles.message, styles.successMessage)}>
                  Группа успешно добавлена
               </p>
            }
         </Flex>
      </Form>
   )
}

export default GroupForm;