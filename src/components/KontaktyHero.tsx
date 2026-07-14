
import Link from 'next/link';
import { Phone, MapPin, Clock3, MessageCircle, Navigation } from 'lucide-react';
import Container from './Container';

const BADGES = [
  { label: 'Ответим за 5 минут', icon: MessageCircle },
  { label: 'Выезд на объект', icon: Navigation },
  { label: 'Работаем Пн-Пт', icon: Clock3 },
  { label: 'Витебск и область', icon: MapPin },
  { label: 'Звонок бесплатный', icon: Phone },
];

const KontaktyHero = () => {
  return (
    <div
      className="relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/4.jpg')" }}
    >
      <div className="absolute inset-0 bg-secondary/85" />

      <Container className="relative py-14 md:py-16">
        <p className="text-sm text-gray-300 mb-4">
          <Link href="/" className="hover:text-white transition-colors">Главная</Link>
          {' / '}
          <span className="text-white">Контакты</span>
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-10 max-w-2xl">
          Свяжитесь с нами удобным способом
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

export default KontaktyHero;