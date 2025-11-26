import { type FC } from 'react';
import { Card, Flex, Select } from 'antd';

import GroupInfoPanel from '@/components/group-info-panel/GroupInfoPanel';
import { useScheduleStore } from '@/store/scheduleStore';

interface IGroupSelectorProps {
   groupId: string | null;
   setGroupId: (id: string | null) => void;
}

const GroupSelector: FC<IGroupSelectorProps> = ({ groupId, setGroupId }) => {
   const { groups } = useScheduleStore();

   return (
      <Card title='Информация по группе'>
         <Flex align='center' gap='large' vertical>
            <Select
               placeholder='Укажите группу'
               value={groupId}
               onChange={(val) => setGroupId(val)}
            >
               {groups.map((group) => (
                  <Select.Option 
                     key={group.id} 
                     value={group.id}
                  >
                     {group.label || group.name}
                  </Select.Option>
               ))}
            </Select>
            <GroupInfoPanel groupId={groupId} />
         </Flex>
      </Card>
   )
}

export default GroupSelector;