export const weekdayName = (day: string): string => {
   const map: Record<string, string> = {
      monday: 'Понедельник',
      tuesday: 'Вторник',
      wednesday: 'Среда',
      thursday: 'Четверг',
      friday: 'Пятница',
      saturday: 'Суббота',
      sunday: 'Воскресенье'
   };

   return map[day.toLowerCase()] ?? day;
};

export const timeToMinutes = (time: string) => {
   const [hh, mm] = time.split(':').map(Number);

   return hh * 60 + mm;
}

export const minutesToTime = (m: number) => {
   const hh = Math.floor(m / 60);
   const mm = m % 60;

   return `${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`;
}

export const formatSlot = (start: string, end: string) => `${start} - ${end}`;