// src/components/ServiceCarousel.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import { SERVICES } from '@/constants/services';

const AUTO_ADVANCE_MS = 15000;

const ServiceCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = SERVICES.length;

  const goToSlide = useCallback(
    (index: number) => {
      setActiveSlide((index + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const goNext = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide]);
  const goPrev = useCallback(() => goToSlide(activeSlide - 1), [activeSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <div
      className="relative overflow-hidden h-[340px] md:h-[400px] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/1.jpg')" }}
    >
      <div className="absolute inset-0 bg-secondary/85" />

      {SERVICES.map((service, i) => (
        <div
          key={service.id}
          className={`absolute inset-0 flex items-center transition-opacity duration-700 ${
            activeSlide === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Container className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-primary text-sm font-medium tracking-wide mb-2">
                Услуга {i + 1} из {totalSlides}
              </p>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                {service.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4 max-w-md text-sm md:text-base">
                {service.shortDescription}
              </p>
              <Link
                href={`/uslugi/${service.id}`}
                className="inline-block px-6 py-2.5 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-all"
              >
                Подробнее
              </Link>
            </div>
            <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden shadow-lg">
              <Image src={service.image} alt={service.title} fill className="object-cover" />
            </div>
          </Container>
        </div>
      ))}

      <button
        onClick={goPrev}
        aria-label="Предыдущая услуга"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
      >
        ‹
      </button>
      <button
        onClick={goNext}
        aria-label="Следующая услуга"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SERVICES.map((service, i) => (
          <button
            key={service.id}
            onClick={() => goToSlide(i)}
            aria-label={`Услуга: ${service.title}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              activeSlide === i ? 'bg-primary' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;