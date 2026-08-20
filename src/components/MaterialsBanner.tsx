// src/components/MaterialsBanner.tsx
import Link from 'next/link';

const MaterialsBanner = () => {
  return (
    <div className="relative overflow-hidden bg-secondary rounded-[24px] px-7 md:px-10 py-9 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-5">
        <span className="hidden sm:flex w-11 h-11 flex-shrink-0 rounded-xl bg-white/10 items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-primary">
            <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-[11px] uppercase tracking-wider mb-2">
            <span className="w-1 h-3 bg-primary rounded-full" />
            Без наценки посредников
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 leading-snug">
            Работаем напрямую с заводами-производителями
          </h3>
          <p className="text-gray-400 text-sm max-w-md">
            Сенеж, Металл Профиль, ГрандЛайн, Ондулин — честные цены без переплат.
          </p>
        </div>
      </div>
      <Link
        href="/tovary"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-sm shadow-primary/40 whitespace-nowrap flex-shrink-0"
      >
        Узнать подробнее
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
};

export default MaterialsBanner;