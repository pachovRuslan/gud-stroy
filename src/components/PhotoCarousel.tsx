'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import type { SanityProject } from '@/sanity/types';
import { urlFor } from '@/sanity/image';

const AUTO_ADVANCE_MS = 6000;

type Props = {
  projects: SanityProject[];
  heightClass?: string;
};

const PhotoCarousel = ({ projects, heightClass = 'h-64 md:h-[420px]' }: Props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const total = projects.length;

  const goToSlide = useCallback((index: number) => {
    setActiveSlide((index + total) % total);
  }, [total]);

  const goNext = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide]);
  const goPrev = useCallback(() => goToSlide(activeSlide - 1), [activeSlide, goToSlide]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goNext, total]);

  if (total === 0) return null;

  const current = projects[activeSlide];

  return (
    <div className={`group relative rounded-[28px] overflow-hidden shadow-lg shadow-black/10 ${heightClass}`}>
      {projects.map((proj, i) => (
        <div
          key={proj._id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            activeSlide === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={urlFor(proj.image).width(900).height(600).url()}
            alt={proj.caption ?? `Объект ${i + 1}`}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Затемнение снизу — для читаемости подписи и счётчика */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />
        </div>
      ))}

      {/* Глэсс-бейдж со счётчиком — тот же приём, что в хиро на главной */}
      {total > 1 && (
        <div className="absolute top-4 left-4 md:top-5 md:left-5 flex items-center gap-2.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-full pl-1 pr-4 py-1 text-white text-xs font-semibold">
          <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-[11px] font-bold">
            {String(activeSlide + 1).padStart(2, '0')}
          </span>
          <span className="opacity-80">/ {String(total).padStart(2, '0')} объектов</span>
        </div>
      )}

      {/* Подпись объекта поверх градиента */}
      {current?.caption && (
        <div className="absolute bottom-6 left-5 right-16 text-white font-semibold text-sm md:text-base drop-shadow-sm">
          {current.caption}
        </div>
      )}

      {/* Стрелки — проявляются на hover, скрыты если слайд один */}
      {total > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Предыдущее фото"
            className="absolute top-1/2 left-3 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/25"
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Следующее фото"
            className="absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/25"
          >
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Индикаторы — полоски вместо точек, как в хиро на главной */}
      {total > 1 && (
        <div className="absolute bottom-5 right-5 flex gap-1.5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Фото объекта ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeSlide === i ? 'w-6 bg-primary' : 'w-3 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoCarousel;
