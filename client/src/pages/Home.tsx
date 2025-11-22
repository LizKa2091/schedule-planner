import { type FC } from 'react';

import MainLayout from '@/router/MainLayout';
import GroupForm from '@/components/form/GroupForm';
import TeacherForm from '@/components/form/TeacherForm';
import RoomForm from '@/components/form/RoomForm';
import SubjectForm from '@/components/form/SubjectForm';

const Home: FC = () => {
   return (
      <MainLayout>
         home
         <GroupForm />
         <TeacherForm />
         <RoomForm />
         <SubjectForm />
      </MainLayout>
   )
}

export default Home;