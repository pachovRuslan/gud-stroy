import type { Stat } from '@/constants/stats';

type Props = {
  stat: Stat;
};

const StatCard = ({ stat }: Props) => {
  return (
    <div>
      <p className="text-3xl font-bold text-primary">{stat.value}</p>
      <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
    </div>
  );
};

export default StatCard;