// src/components/KreditovanieHero.tsx
import Link from 'next/link';
import { ShieldCheck, Zap, UserCheck, FileSignature, Landmark } from 'lucide-react';
import Container from './Container';

const BADGES = [
  { label: 'Рассмотрение за 1 день', icon: Zap },
  { label: 'Индивидуальный подбор', icon: UserCheck },
  { label: 'Без скрытых комиссий', icon: ShieldCheck },
  { label: 'Помощь с документами', icon: FileSignature },
  { label: 'Работаем с банками РБ', icon: Landmark },
];

const KreditovanieHero = () => {
  return (
    <section className="pt-4 md:pt-6 pb-10 md:pb-16">
      <Container>
        <div className="rounded-[32px] overflow-hidden shadow-xl shadow-black/10">
          {/* Фото-часть — только breadcrumb и заголовок, ничего мелкого поверх изображения */}
          <div
            className="relative bg-cover bg-center"
            style={{ backgroundImage: "url('/images/5.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/80 via-secondary/85 to-secondary/95" />

            <div className="relative px-6 md:px-14 py-12 md:py-16">
              <div className="flex items-center gap-2 text-sm text-gray-300 mb-6">
                <Link href="/" className="hover:text-white transition-colors">Главная</Link>
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-gray-500">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-white">Кредитование</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white max-w-2xl leading-tight tracking-tight">
                Стройте дом сейчас — платите потом
              </h1>
            </div>
          </div>

          {/* Бейджи — на чистом светлом фоне, не на фото */}
          <div className="bg-white px-6 md:px-14 py-8 md:py-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {BADGES.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.label} className="group flex items-center gap-3">
                    <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.75} />
                    </div>
                    <p className="text-xs md:text-sm text-secondary font-bold leading-snug">
                      {badge.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default KreditovanieHero;