import { type FC } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';

import { useZodForm } from '@/hooks/useZodForm';
import { addRoomSchema } from '@/schemas/schedule';
import { roomTypeOptions } from '@/types/constants';
import { type RoomFormData } from '@/types/formDataTypes';

const RoomForm: FC = () => {
   const { onFinish, formErrors } = useZodForm<RoomFormData>({
      schemaAction: addRoomSchema,
      entityName: 'rooms'
   })

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