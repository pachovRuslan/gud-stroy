// src/components/BenefitCard.tsx
import type { LucideIcon } from 'lucide-react';
import type { Benefit } from '@/constants/benefits';

type Props = {
  benefit: Benefit;
  Icon: LucideIcon;
  index: number;
};

const BenefitCard = ({ benefit, Icon, index }: Props) => {
  return (
    <div className="group relative rounded-[20px] border border-gray-100 bg-white p-7 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Крупный приглушённый номер в углу — «6 причин» это реальный список, нумерация оправдана */}
      <span className="absolute top-4 right-5 text-4xl font-extrabold text-primary/[0.08] group-hover:text-primary/[0.14] transition-colors leading-none select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-105 transition-all duration-300">
        <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" strokeWidth={1.75} />
      </div>
      <p className="relative text-lg md:text-xl font-bold text-secondary mb-3 leading-snug">{benefit.title}</p>
      <p className="relative text-sm md:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
    </div>
  );
};

export default BenefitCard;
