
import Link from 'next/link';
import { PackageCheck, Truck, Warehouse, Tag, Calculator } from 'lucide-react';
import Container from './Container';

const BADGES = [
  { label: 'В наличии на складе', icon: PackageCheck },
  { label: 'Доставка по Витебску', icon: Truck },
  { label: 'Собственный склад', icon: Warehouse },
  { label: 'Цены от производителя', icon: Tag },
  { label: 'Точный расчёт материала', icon: Calculator },
];

const TovaryHero = () => {
  return (
    <div
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/2.jpg')" }}
    >
      <div className="absolute inset-0 bg-secondary/85" />

      <Container className="relative py-14 md:py-16">
        <p className="text-sm text-gray-300 mb-4">
          <Link href="/" className="hover:text-white transition-colors">Главная</Link>
          {' / '}
          <span className="text-white">Товары</span>
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-10 max-w-2xl">
          Стройматериалы напрямую от производителей
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-8 border-t border-white/15">
          {BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-primary/60 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                </div>
                <p className="text-xs md:text-sm text-gray-200 font-medium tracking-wide">
                  {badge.label.toUpperCase()}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default TovaryHero;