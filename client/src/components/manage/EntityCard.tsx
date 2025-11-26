import { type FC } from 'react'
import { Button, Card, Flex } from 'antd';

interface IEntityCardProps {
   title: string;
   handleView: () => void;
   handleAdd: () => void;
}

const EntityCard: FC<IEntityCardProps> = ({ title, handleView, handleAdd }) => {
   return (
      <Card title={title}>
         <Flex gap='middle'>
            <Button onClick={handleView}>Посмотреть</Button>
            <Button onClick={handleAdd}>Добавить</Button>
         </Flex>
      </Card>
   )
}

export default EntityCard;