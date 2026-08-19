// src/components/ServiceCarousel.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY } from '@/constants/company';
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

  const active = services[activeSlide];

  return (
    <section className="pt-4 md:pt-6 pb-10 md:pb-16">
      <div className="px-3 md:px-6">
        <div
          className="group relative overflow-hidden rounded-[28px] shadow-xl shadow-black/10 h-[460px] md:h-[500px] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/1.jpg')" }}
        >
          <div className="absolute inset-0 bg-secondary/85" />

          {services.map((service, i) => (
            <div
              key={service._id}
              className={`absolute inset-0 flex items-center transition-opacity duration-700 ${
                activeSlide === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-14 md:px-20 lg:px-24">
                <div className="max-w-xl">
                  {/* Глэсс-бейдж с номером — та же деталь, что в Header/PhotoCarousel */}
                  <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pl-1.5 pr-4 py-1 mb-4">
                    <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-white/80 text-xs font-semibold">
                      услуга {i + 1} из {totalSlides}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-[1.1] tracking-tight">
                    {service.title}
                  </h2>
                  {service.shortDescription && (
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base line-clamp-3">
                      {service.shortDescription}
                    </p>
                  )}
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm md:text-base font-semibold rounded-full hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-sm shadow-primary/40"
                  >
                    Подробнее
                    <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

                {service.image && (
                  <div className="relative hidden lg:block w-full h-64 rounded-[18px] overflow-hidden shadow-2xl">
                    <Image
                      src={urlFor(service.image).width(1200).height(900).url()}
                      alt={service.title}
                      fill
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Плавающая карточка с годом основания — постоянная, не зависит от слайда */}
          <div className="hidden md:flex absolute bottom-6 right-6 items-center gap-3 bg-white rounded-2xl px-5 py-3 shadow-xl z-10">
            <span className="text-2xl font-extrabold text-primary leading-none">
              {COMPANY.experience}
            </span>
            <span className="text-[11px] text-secondary/70 font-medium leading-snug max-w-[100px]">
              на рынке строительства
            </span>
          </div>

          {totalSlides > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Предыдущая услуга"
                className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 z-10"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={goNext}
                aria-label="Следующая услуга"
                className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 z-10"
              >
                <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Полоски прогресса вместо точек — как в PhotoCarousel */}
              <div className="absolute bottom-6 left-14 md:left-20 lg:left-24 flex gap-1.5 z-10">
                {services.map((service, i) => (
                  <button
                    key={service._id}
                    onClick={() => goToSlide(i)}
                    aria-label={`Услуга: ${service.title}`}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      activeSlide === i ? 'w-7 bg-primary' : 'w-3.5 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceCarousel;
