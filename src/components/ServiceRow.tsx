// src/components/ServiceRow.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Home, Layers, Construction, Drill, Truck } from 'lucide-react';
import type { Service } from '@/constants/services';

const SERVICE_ICONS: Record<string, LucideIcon> = {
  'frame-houses': Home,
  'block-houses': Layers,
  'foundation': Construction,
  'pile-drilling': Drill,
  'excavator-rental': Truck,
};

type Props = {
  service: Service;
  reversed?: boolean;
};

const ServiceRow = ({ service, reversed = false }: Props) => {
  const Icon = SERVICE_ICONS[service.id] ?? Home;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3">{service.title}</h3>
        <p className="text-gray-600 leading-relaxed mb-5">{service.shortDescription}</p>

        <ul className="flex flex-col gap-2 mb-6">
          {service.highlights.map((point) => (
            <li key={point} className="flex gap-2 text-sm text-gray-700">
              <span className="text-primary font-bold flex-shrink-0">✓</span>
              {point}
            </li>
          ))}
        </ul>

        <Link
          href={`/uslugi/${service.id}`}
          className="inline-block px-6 py-2.5 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-all"
        >
          Подробнее
        </Link>
      </div>

      <div className="relative">
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
          <Image src={service.image} alt={service.title} fill className="object-cover" />
        </div>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary rounded-lg flex items-center justify-center shadow-lg">
          <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
};

export default ServiceRow;