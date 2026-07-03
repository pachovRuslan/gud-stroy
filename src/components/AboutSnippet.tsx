// src/components/AboutSnippet.tsx
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY } from '@/constants/company';

const AboutSnippet = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-2xl font-bold text-secondary mb-4">
          {COMPANY.name} — это больше, чем строительство
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Строительство домов под ключ, фундаментные работы и аренда спецтехники
          в {COMPANY.region}. {COMPANY.experience} опыта, честные цены и полное
          документальное сопровождение на каждом объекте.
        </p>
        <Link
          href="/o-nas"
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-all"
        >
          Связаться с нами
        </Link>
      </div>
      <div className="relative w-full h-72 rounded-lg overflow-hidden bg-gray-100">
        <Image src="/images/0.jpg" alt={COMPANY.name} fill className="object-cover" />
      </div>
    </div>
  );
};

export default AboutSnippet;