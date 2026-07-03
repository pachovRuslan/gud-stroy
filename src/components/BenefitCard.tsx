
import React from 'react';
import {
  Ruler,
  Handshake,
  CreditCard,
  FileCheck2,
  Truck,
  Award,
  type LucideIcon,
} from 'lucide-react';
import type { Benefit } from '@/constants/benefits';

type Props = {
  benefit: Benefit;
};

const ICONS: Record<string, LucideIcon> = {
  ruler: Ruler,
  handshake: Handshake,
  'credit-card': CreditCard,
  'file-check': FileCheck2,
  truck: Truck,
  award: Award,
};

const BenefitCard = ({ benefit }: Props) => {
  const Icon = ICONS[benefit.icon] ?? Award;

  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
        <Icon size={20} strokeWidth={2} />
      </div>
      <div>
        <p className="font-medium text-secondary text-sm mb-1">{benefit.title}</p>
        <p className="text-xs text-gray-600 leading-relaxed">{benefit.description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
