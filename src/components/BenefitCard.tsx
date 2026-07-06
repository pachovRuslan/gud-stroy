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
      className={`rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow ${
        shaded ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" strokeWidth={1.75} />
      </div>
      <p className="font-semibold text-secondary mb-2">{benefit.title}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
    </div>
  );
};

export default BenefitCard;