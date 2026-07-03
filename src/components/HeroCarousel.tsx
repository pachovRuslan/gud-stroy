// src/components/HeroCarousel.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from './Container';
import { COMPANY } from '@/constants/company';

const AUTO_ADVANCE_MS = 15000;

const HeroCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 2;

  const goToSlide = useCallback((index: number) => {
    setActiveSlide((index + totalSlides) % totalSlides);
  }, []);

  const goNext = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide]);
  const goPrev = useCallback(() => goToSlide(activeSlide - 1), [activeSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <div className="relative bg-secondary overflow-hidden">
      {/* Слайд 1 — заголовок и УТП */}
      <div
        className={`transition-opacity duration-700 ${
          activeSlide === 0 ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'
        }`}
      >
        <Container className="py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-bold text-white max-w-xl mb-4">
            Строительство домов и фундаментные работы под ключ
          </h1>
          <p className="text-gray-300 max-w-lg">
            Витебск и Витебская область. Собственная техника, кредиты по 240 и 95 Указу.
          </p>
        </Container>
      </div>

      {/* Слайд 2 — о компании с фото */}
      <div
        className={`transition-opacity duration-700 ${
          activeSlide === 1 ? 'opacity-100 relative' : 'opacity-0 absolute inset-0 pointer-events-none'
        }`}
      >
        <Container className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {COMPANY.name} — это больше, чем строительство
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
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
          <div className="relative w-full h-56 md:h-72 rounded-lg overflow-hidden">
            <Image src="/images/1.jpg" alt={COMPANY.name} fill className="object-cover" />
          </div>
        </Container>
      </div>

      {/* Невидимый спейсер, чтобы контейнер не схлопывался при position: absolute на неактивном слайде */}
      <div className="invisible py-16 md:py-24">
        <Container>
          <div className="h-56 md:h-72" />
        </Container>
      </div>

      {/* Стрелки навигации */}
      <button
        onClick={goPrev}
        aria-label="Предыдущий слайд"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        ‹
      </button>
      <button
        onClick={goNext}
        aria-label="Следующий слайд"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
      >
        ›
      </button>

      {/* Точки-индикаторы */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Слайд ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              activeSlide === i ? 'bg-primary' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;