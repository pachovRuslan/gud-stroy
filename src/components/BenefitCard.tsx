// src/components/BenefitCard.tsx
import type { LucideIcon } from 'lucide-react';
import type { Benefit } from '@/constants/benefits';

type Props = {
  benefit: Benefit;
  Icon: LucideIcon;
  shaded?: boolean;
};

const BenefitCard = ({ benefit, Icon, shaded = false }: Props) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 p-7 hover:shadow-md transition-shadow ${
        shaded ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-primary" strokeWidth={1.75} />
      </div>
      <p className="text-lg md:text-xl font-semibold text-secondary mb-3 leading-snug">{benefit.title}</p>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
    </div>
  );
};

export default BenefitCard;
