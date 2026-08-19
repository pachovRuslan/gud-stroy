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
    <section className="py-16 bg-gray-50">
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-3 text-center">
          {title}
        </h2>
        <p className="text-sm md:text-base text-gray-500 mb-10 text-center max-w-2xl mx-auto">
          Прямые контракты с производителями стройматериалов и проверенные поставщики
        </p>

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
                  className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-opacity duration-500 ${
                    activeSlide === slideIdx
                      ? 'opacity-100'
                      : 'opacity-0 hidden'
                  }`}
                >
                  {slideClients.map((client, i) => (
                    <div
                      key={`${client.name}-${i}`}
                      className="aspect-[3/2] bg-white rounded-lg border border-gray-200 flex items-center justify-center p-6 hover:shadow-md transition-shadow"
                    >
                      {client.logo ? (
                        <Image
                          src={client.logo}
                          alt={client.name}
                          width={160}
                          height={80}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        // Плейсхолдер до того, как заказчик загрузит реальные логотипы.
                        <span className="text-base md:text-lg font-semibold text-gray-400 text-center">
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
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Слайд ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeSlide === i ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          * Логотипы будут добавлены позже
        </p>
      </Container>
    </section>
  );
};

export default ClientsCarousel;
