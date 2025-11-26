import type { JSX } from 'react';

import TeacherForm from '@/components/form/TeacherForm';
import GroupForm from '@/components/form/GroupForm';
import SubjectForm from '@/components/form/SubjectForm';
import RoomForm from '@/components/form/RoomForm';
import ScheduleForm from '@/components/form/ScheduleForm';
import EntityTable from '@/components/entity-table/EntityTable';
import { columnsMap } from '@/components/entity-table/columnsMap';
import { useScheduleStore } from '@/store/scheduleStore';
import { type ModalType } from '@/types/modalTypes';

export const useMapModalContent = () => {
   const { groups, teachers, rooms, subjects } = useScheduleStore();
   
   const mapContent: Record<ModalType, JSX.Element> = {
      'teachers-view': <EntityTable data={teachers} cols={columnsMap.teachers} />,
      'teachers-form': <TeacherForm />,

      'groups-view': <EntityTable data={groups} cols={columnsMap.groups} />,
      'groups-form': <GroupForm />,

      'subjects-view': <EntityTable data={subjects} cols={columnsMap.subjects} />,
      'subjects-form': <SubjectForm />,

      'rooms-view': <EntityTable data={rooms} cols={columnsMap.rooms} />,
      'rooms-form': <RoomForm />,

      'schedule-block': <ScheduleForm />
   }

   return mapContent;
}