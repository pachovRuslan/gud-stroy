export type Stat = {
  id: string;
  value: string;
  label: string;
};

export const STATS: Stat[] = [
  { id: 'experience', value: '8–10', label: 'лет опыта' },
  { id: 'projects', value: '47+', label: 'выполненных объявлений/проектов' },
  { id: 'rating', value: '5.0', label: 'рейтинг на площадках' },
  { id: 'response', value: '~5 мин', label: 'среднее время ответа' },
];