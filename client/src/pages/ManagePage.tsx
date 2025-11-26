import { useState, type FC } from 'react';
import { Button, Flex } from 'antd';

import Modal from '@/components/modal/Modal';
import EntityCard from '@/components/manage/EntityCard';
import GroupSelector from '@/components/manage/GroupSelector';
import { useMapModalContent } from '@/hooks/useMapModalContent';
import type { ModalType } from '@/types/modalTypes';

const ManagePage: FC = () => {
   const [currModal, setCurrModal] = useState<ModalType | null>(null);
   const [currGroupId, setCurrGroupId] = useState<string | null>(null);

   const modalContent = useMapModalContent();

   return (
      <Flex justify='center' align='center' gap='large' vertical>
         <Flex justify='space-between' gap='middle'>
            <EntityCard
               title='Преподаватели'
               handleView={() => setCurrModal('teachers-view')}
               handleAdd={() => setCurrModal('teachers-form')}
            />
            <EntityCard
               title='Группы'
               handleView={() => setCurrModal('groups-view')}
               handleAdd={() => setCurrModal('groups-form')}
            />
            <EntityCard
               title='Предметы'
               handleView={() => setCurrModal('subjects-view')}
               handleAdd={() => setCurrModal('subjects-form')}
            />
            <EntityCard
               title='Аудитории'
               handleView={() => setCurrModal('rooms-view')}
               handleAdd={() => setCurrModal('rooms-form')}
            />
         </Flex>
         <GroupSelector groupId={currGroupId} setGroupId={setCurrGroupId} />
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