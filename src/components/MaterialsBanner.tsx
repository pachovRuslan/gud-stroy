
// src/components/MaterialsBanner.tsx
import Link from 'next/link';

const MaterialsBanner = () => {
  return (
    <div className="bg-secondary rounded-lg px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h3 className="text-xl font-bold text-white mb-2">
          Работаем напрямую с заводами-производителями
        </h3>
        <p className="text-gray-300 text-sm max-w-md">
          Сенеж, Металл Профиль, ГрандЛайн, Ондулин — честные цены без наценки посредников.
        </p>
      </div>
      <Link
        href="/tovary"
        className="px-6 py-3 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-all whitespace-nowrap"
      >
        Узнать подробнее
      </Link>
    </div>
  );
};

export default MaterialsBanner;