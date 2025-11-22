import { useState, type FC } from 'react';
import { Button, Card, Flex } from 'antd';

import EntityTable from '@/components/entity-table/EntityTable';
import Modal from '@/components/modal/Modal';
import TeacherForm from '@/components/form/TeacherForm';
import GroupForm from '@/components/form/GroupForm';
import SubjectForm from '@/components/form/SubjectForm';
import RoomForm from '@/components/form/RoomForm';
import { useScheduleStore } from '@/store/scheduleStore';
import { columnsMap } from '@/components/entity-table/columnsMap';

import { type ModalType } from '@/types/modalTypes';

const ManagePage: FC = () => {
   const { groups, teachers, rooms, subjects } = useScheduleStore();
   const [currModal, setCurrModal] = useState<ModalType | null>(null);

   const renderModalContent = (type: ModalType) => {
      switch (type) {
         case 'teachers-view': return <EntityTable data={teachers} cols={columnsMap.teachers} />;
         case 'teachers-form': return <TeacherForm />;

         case 'groups-view': return <EntityTable data={groups} cols={columnsMap.groups} />;
         case 'groups-form': return <GroupForm />;

         case 'subjects-view': return <EntityTable data={subjects} cols={columnsMap.subjects} />;
         case 'subjects-form': return <SubjectForm />;

         case 'rooms-view': return <EntityTable data={rooms} cols={columnsMap.rooms} />;
         case 'rooms-form': return <RoomForm />;
      }
   }

   return (
      <>
         <Flex justify='space-between'>
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
         {currModal && 
            <Modal onClose={() => setCurrModal(null)}>
               {renderModalContent(currModal)}
            </Modal>
         }
      </>
   )
}

export default ManagePage;