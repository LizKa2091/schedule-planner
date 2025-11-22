import type { EntityType } from "@/store/scheduleTypes";

interface ColumnData {
   title: string;
   dataIndex: string;
}

export const columnsMap: Record<EntityType, ColumnData[]> = {
   groups: [
      { title: 'Название', dataIndex: 'name' },
      { title: 'Отображаемое название', dataIndex: 'label' },
      { title: 'Кол-во студентов', dataIndex: 'studentsCount' }
   ],

   teachers: [
      { title: 'Имя', dataIndex: 'name' },
      { title: 'Отображаемое имя', dataIndex: 'label' },
      { title: 'Почта', dataIndex: 'email' },
      { title: 'Телефон', dataIndex: 'phone' },
      { title: 'Макс. часы', dataIndex: 'maxHours' }
   ],

   rooms: [
      { title: 'Название', dataIndex: 'name' },
      { title: 'Тип', dataIndex: 'type' },
      { title: 'Вместимость', dataIndex: 'capacity' }
   ],

   subjects: [
      { title: 'Название', dataIndex: 'name' },
      { title: 'Часов/нед', dataIndex: 'hoursPerWeek' }
   ],

   scheduleSlots: []
};
