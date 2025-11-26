import { useState, type FC } from 'react';
import { Button, Card, Flex, Select } from 'antd';

import Modal from '@/components/modal/Modal';
import GroupInfoPanel from '@/components/group-info-panel/GroupInfoPanel';
import { Option } from 'antd/es/mentions';
import { useScheduleStore } from '@/store/scheduleStore';
import { useMapModalContent } from '@/hooks/useMapModalContent';
import type { ModalType } from '@/types/modalTypes';

const ManagePage: FC = () => {
   const { groups } = useScheduleStore();
   const [currModal, setCurrModal] = useState<ModalType | null>(null);
   const [currGroupId, setCurrGroupId] = useState<string | null>(null);

   const modalContent = useMapModalContent();

   return (
      <Flex justify='center' align='center' gap='large' vertical>
         <Flex justify='space-between' gap='middle'>
            <Card title='Преподаватели'>
               <Flex gap='middle'>
                  <Button onClick={() => setCurrModal('teachers-view')}>Посмотреть</Button>
                  <Button onClick={() => setCurrModal('teachers-form')}>Добавить</Button>
               </Flex>
            </Card>
            <Card title='Группы'>
               <Flex gap='middle'>
                  <Button onClick={() => setCurrModal('groups-view')}>Посмотреть</Button>
                  <Button onClick={() => setCurrModal('groups-form')}>Добавить</Button>
               </Flex>
            </Card>
            <Card title='Предметы'>
               <Flex gap='middle'>
                  <Button onClick={() => setCurrModal('subjects-view')}>Посмотреть</Button>
                  <Button onClick={() => setCurrModal('subjects-form')}>Добавить</Button>
               </Flex>
            </Card>
            <Card title='Аудитории'>
               <Flex gap='middle'>
                  <Button onClick={() => setCurrModal('rooms-view')}>Посмотреть</Button>
                  <Button onClick={() => setCurrModal('rooms-form')}>Добавить</Button>
               </Flex>
            </Card>
         </Flex>
         <Flex>
            <Card title='Информация по группе'>
               <Flex align='center' gap='large' vertical>
                  <Select
                     placeholder='Укажите группу'
                     value={currGroupId}
                     onChange={(val) => setCurrGroupId(val)}
                  >
                     {groups.map((group) => (
                        <Option key={group.id} value={group.id}>{group.label || group.name}</Option>
                     ))}
                  </Select>
                  <GroupInfoPanel groupId={currGroupId} />
               </Flex>
            </Card>
         </Flex>
         <Button type='primary' onClick={() => setCurrModal('schedule-block')}>Создать элемент расписания</Button>
         {currModal && 
            <Modal onClose={() => setCurrModal(null)}>
               {modalContent[currModal]}
            </Modal>
         }
      </Flex>
   )
}

export default ManagePage;