
'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PROJECT_IMAGES = ['/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg', '/images/5.jpg'];
const AUTO_ADVANCE_MS = 6000;

const TILES = [
  {
    label: 'Строительство',
    sublabel: 'домов под ключ',
    href: '/uslugi',
    image: '/images/1.jpg',
  },
  {
    label: 'Аренда техники',
    sublabel: 'в Витебске и области',
    href: '/uslugi',
    image: '/images/5.jpg',
  },
  {
    label: 'Товары',
    sublabel: 'стройматериалы напрямую',
    href: '/tovary',
    image: '/images/2.jpg',
  },
];

const ProjectsShowcase = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const total = PROJECT_IMAGES.length;

  const goToSlide = useCallback((index: number) => {
    setActiveSlide((index + total) % total);
  }, [total]);

  const goNext = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Большая карусель с фото объектов */}
      <div className="lg:col-span-2 relative rounded-lg overflow-hidden h-64 md:h-[420px]">
        {PROJECT_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeSlide === i ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image src={src} alt={`Объект ${i + 1}`} fill className="object-cover" />
          </div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
          <Link
            href="/o-nas"
            className="inline-block px-5 py-2 bg-white text-secondary text-sm font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            О компании ↗
          </Link>
        </div>

        <div className="absolute bottom-5 right-5 flex gap-2">
          {PROJECT_IMAGES.map((_, i) => (
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
      </div>

      {/* Три плитки — растягиваются на всю высоту карусели */}
      <div className="flex flex-col gap-4 h-64 md:h-[420px]">
        {TILES.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className="relative rounded-lg overflow-hidden flex-1 min-h-0 group"
          >
            <Image
              src={tile.image}
              alt={tile.label}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-secondary/60 group-hover:bg-secondary/70 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              <p className="text-white font-semibold text-sm">{tile.label}</p>
              <p className="text-gray-200 text-xs">{tile.sublabel}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsShowcase;