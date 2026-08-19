// src/components/ProjectsShowcase.tsx
import Link from 'next/link';
import Image from 'next/image';
import PhotoCarousel from './PhotoCarousel';
import { urlFor } from '@/sanity/image';
import type { SanityProject } from '@/sanity/types';

const TILES = [
  { label: 'Строительство', sublabel: 'домов под ключ', href: '/uslugi', image: '/images/1.jpg' },
  { label: 'Аренда техники', sublabel: 'в Витебске и области', href: '/uslugi/excavator-rental', image: '/images/5.jpg' },
  { label: 'Товары', sublabel: 'стройматериалы напрямую', href: '/tovary', image: '/images/2.jpg' },
];

type Props = {
  projects: SanityProject[];
};

const ProjectsShowcase = ({ projects }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 relative">
        <PhotoCarousel projects={projects} />
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-b-[28px]">
          <Link
            href="/o-nas"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-secondary text-sm font-semibold rounded-full hover:-translate-y-0.5 transition-all pointer-events-auto shadow-sm"
          >
            О компании
            <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5">
              <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 h-64 md:h-[420px]">
        {TILES.map((tile) => (
          <Link
            key={tile.label}
            href={tile.href}
            className="relative rounded-[18px] overflow-hidden flex-1 min-h-0 group shadow-md shadow-black/10"
          >
            <Image
              src={tile.image}
              alt={tile.label}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent group-hover:from-secondary/95 transition-colors" />
            <div className="absolute inset-0 flex items-end justify-between p-4">
              <div>
                <p className="text-white font-semibold text-sm">{tile.label}</p>
                <p className="text-gray-300 text-xs mt-0.5">{tile.sublabel}</p>
              </div>
              <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center flex-shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-white">
                  <path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectsShowcase;
