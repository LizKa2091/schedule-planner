import { type FC } from 'react';
import { Table } from 'antd';

interface IEntityTableProps {
   data: any[];
   cols: any[];
}

const EntityTable: FC<IEntityTableProps> = ({ data, cols }) => {
   return (
      <Table dataSource={data} columns={cols} rowKey='id' />
   )
}

export default EntityTable;