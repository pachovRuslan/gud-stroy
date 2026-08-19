// src/components/ServiceCarousel.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import type { SanityService } from '@/sanity/types';
import { urlFor } from '@/sanity/image';

const AUTO_ADVANCE_MS = 15000;

type Props = {
  services: SanityService[];
};

const ServiceCarousel = ({ services }: Props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = services.length;

  const goToSlide = useCallback(
    (index: number) => {
      setActiveSlide((index + totalSlides) % totalSlides);
    },
    [totalSlides]
  );

  const goNext = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide]);
  const goPrev = useCallback(() => goToSlide(activeSlide - 1), [activeSlide, goToSlide]);

  useEffect(() => {
    if (totalSlides <= 1) return; // авто-листание нужно только когда слайдов > 1
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goNext, totalSlides]);

  if (totalSlides === 0) {
    return null;
  }

  return (
    <div
      className="relative overflow-hidden h-[520px] md:h-[680px] bg-cover bg-center"
      style={{ backgroundImage: "url('/images/1.jpg')" }}
    >
      <div className="absolute inset-0 bg-secondary/80" />

      {services.map((service, i) => (
        <div
          key={service._id}
          className={`absolute inset-0 flex items-center transition-opacity duration-700 ${
            activeSlide === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Container className="relative w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-primary text-base md:text-lg font-medium tracking-wide mb-3">
                Услуга {i + 1} из {totalSlides}
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {service.title}
              </h2>
              {service.shortDescription && (
                <p className="text-gray-200 leading-relaxed mb-6 max-w-xl text-base md:text-lg line-clamp-4">
                  {service.shortDescription}
                </p>
              )}
              <Link
                href={`/uslugi/${service.slug}`}
                className="inline-block px-8 py-3 bg-primary text-white text-base md:text-lg font-semibold rounded hover:bg-primary-dark transition-all"
              >
                Подробнее
              </Link>
            </div>
            {service.image && (
              <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={urlFor(service.image).width(1200).height(900).url()}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </Container>
        </div>
      ))}

      {totalSlides > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Предыдущая услуга"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white text-xl flex items-center justify-center transition-colors z-10"
          >
            ‹
          </button>
          <button
            onClick={goNext}
            aria-label="Следующая услуга"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white text-xl flex items-center justify-center transition-colors z-10"
          >
            ›
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {services.map((service, i) => (
              <button
                key={service._id}
                onClick={() => goToSlide(i)}
                aria-label={`Услуга: ${service.title}`}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeSlide === i ? 'bg-primary' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceCarousel;
