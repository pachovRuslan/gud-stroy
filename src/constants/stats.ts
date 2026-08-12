export type Stat = {
  id: string;
  value: string;
  label: string;
};

export const STATS: Stat[] = [
  { id: 'experience', value: '8', label: 'лет опыта' },
  { id: 'projects', value: '47+', label: 'выполненных объявлений/проектов' },
  { id: 'rating', value: '900+ ', label: 'кубов бетона залито' },
  { id: 'response', value: '4000м2+', label: 'кровель смонтированно' },
];