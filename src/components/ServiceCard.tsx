import React from 'react';
import Image from 'next/image';
import type { Service } from '@/constants/services';

type Props = {
  service: Service;
};

const ServiceCard = ({ service }: Props) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full h-40 bg-gray-100">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-secondary mb-2">{service.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{service.shortDescription}</p>
        <button className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
          Подробнее →
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;