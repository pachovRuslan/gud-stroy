'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Container from './Container';

const AUTO_ADVANCE_MS = 5000;

// Плейсхолдер-логотипы. Заказчик предоставит реальные позже —
// тогда заменим на данные из Sanity (тип "client" с полем image).
// Сейчас используем серые квадраты с названием бренда для демонстрации.
const PLACEHOLDER_CLIENTS = [
  { name: 'Металл Профиль', logo: null },
  { name: 'ГрандЛайн', logo: null },
  { name: 'Сенеж', logo: null },
  { name: 'Ондулин', logo: null },
  { name: 'Кнауф', logo: null },
  { name: 'Rockwool', logo: null },
  { name: 'Caparol', logo: null },
  { name: 'Ceresit', logo: null },
];

type Client = {
  name: string;
  logo: string | null;
};

type Props = {
  clients?: Client[];
  title?: string;
};

const ClientsCarousel = ({
  clients = PLACEHOLDER_CLIENTS,
  title = 'Наши клиенты и партнёры',
}: Props) => {
  const [activeSlide, setActiveSlide] = useState(0);

  // Группируем по 4 логотипа на слайд (на десктопе), 2 на мобильном.
  // Используем фиксированное число 4 — на мобильном Tailwind сделает wrap.
  const clientsPerSlide = 4;
  const totalSlides = Math.ceil(clients.length / clientsPerSlide);

  const goNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goNext, totalSlides]);

  if (clients.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <Container>
       <div className="max-w-2xl mb-12 md:mb-14">
  <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-3">
    <span className="w-1 h-3.5 bg-primary rounded-full" />
    Партнёры
  </span>
  <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-4 tracking-tight">
    {title}
  </h2>
  <p className="text-sm md:text-base text-gray-500 leading-relaxed">
    Прямые контракты с производителями стройматериалов и проверенные поставщики
  </p>
</div>

        <div className="relative">
          <div className="overflow-hidden">
            {Array.from({ length: totalSlides }).map((_, slideIdx) => {
              const slideClients = clients.slice(
                slideIdx * clientsPerSlide,
                (slideIdx + 1) * clientsPerSlide
              );
              return (
                <div
                  key={slideIdx}
                  className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-opacity duration-500 ${
                    activeSlide === slideIdx
                      ? 'opacity-100'
                      : 'opacity-0 hidden'
                  }`}
                >
                  {slideClients.map((client, i) => (
                    <div
                      key={`${client.name}-${i}`}
                      className="group aspect-[3/2] bg-white rounded-[18px] border border-gray-100 flex items-center justify-center p-6 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 hover:border-transparent transition-all duration-300"
                    >
                      {client.logo ? (
                        <Image
                          src={client.logo}
                          alt={client.name}
                          width={160}
                          height={80}
                          className="max-w-full max-h-full object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        />
                      ) : (
                        // Плейсхолдер до того, как заказчик загрузит реальные логотипы.
                        <span className="text-sm md:text-base font-bold text-gray-400 text-center group-hover:text-primary transition-colors">
                          {client.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {totalSlides > 1 && (
            <div className="flex justify-center gap-1.5 mt-10">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Слайд ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeSlide === i ? 'w-7 bg-primary' : 'w-3.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-8 text-center">
          * Логотипы будут добавлены позже
        </p>
      </Container>
    </section>
  );
};

export default ClientsCarousel;