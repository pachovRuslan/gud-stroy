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

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goNext, total]);

  if (total === 0) return null;

  return (
    <div className={`relative rounded-lg overflow-hidden ${heightClass}`}>
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
          />
        </div>
      ))}

      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Фото объекта ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeSlide === i ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoCarousel;