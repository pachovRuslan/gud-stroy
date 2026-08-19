// src/components/BenefitCard.tsx
import type { LucideIcon } from 'lucide-react';
import type { Benefit } from '@/constants/benefits';

type Props = {
  benefit: Benefit;
  Icon: LucideIcon;
  shaded?: boolean;
  // Опциональный порядковый номер карточки (0-based).
  // Если передан — в углу карточки показывается номер (01, 02, 03...).
  index?: number;
};

const BenefitCard = ({ benefit, Icon, shaded = false, index }: Props) => {
  // Форматируем номер как "01", "02", "03" и т.д.
  const displayNumber =
    typeof index === 'number' ? String(index + 1).padStart(2, '0') : null;

  return (
    <div
      className={`relative rounded-lg border border-gray-200 p-7 hover:shadow-md transition-shadow overflow-hidden ${
        shaded ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      {/* Номер в правом верхнем углу — крупный, полупрозрачный */}
      {displayNumber && (
        <span className="absolute top-4 right-5 text-5xl md:text-6xl font-bold text-gray-100 select-none leading-none pointer-events-none">
          {displayNumber}
        </span>
      )}

      <div className="relative">
        <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
          <Icon className="w-7 h-7 text-primary" strokeWidth={1.75} />
        </div>
        <p className="text-lg md:text-xl font-semibold text-secondary mb-3 leading-snug">
          {benefit.title}
        </p>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {benefit.description}
        </p>
      </div>
    </div>
  );
};

export default BenefitCard;
